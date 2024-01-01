import paystack from '/public/assets/settings/paystack.jpg';
import chequebase from '/public/assets/settings/chequebase.jpg';
import { TSubscriptionSummaryCurrentModalType } from 'components/modules/settings/license/SubscriptionSummary';
import { useAppContext } from 'context/AppContext';
import { useChooseSubscriptionPlan } from 'hooks/api/subscriptions/useChooseSubscriptionPlan';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';
import { useHandleError } from 'hooks/api/useHandleError';
import { useQueryClientInvalidator } from 'hooks/app/useQueryClientInvalidator';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useRouter } from 'next/router';
import process from 'process';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { PaystackProps } from 'react-paystack/libs/types';

export const useManageSubscription = ({
  setCurrentModalType,
}: ManageSubscriptionProps) => {
  const { getCurrentUser, dispatch, state } = useAppContext();

  const { handleError } = useHandleError();

  const [mode, setMode] = useState<'success' | 'confirming' | null>(null);

  const [selectedMethod, setSelectedMethod] = useState('');

  const { isLoading, isError, data } = useGetActiveSubscription();

  const currentPlan = data?.plan,
    currentPlanMonths = data?.meta?.months ?? 1;

  const defaultPaystackConfig: PaystackProps = {
    email: state?.user?.email ?? '',
    amount: 0,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const [paystackConfig, setPaystackConfig] = useState<PaystackProps>(
    defaultPaystackConfig
  );

  const { push } = useRouter();

  const { primaryWallet, getAmountWithCurrency } = useManageWallets();

  const initializePayment = usePaystackPayment(paystackConfig);

  const { invalidate } = useQueryClientInvalidator();

  useEffect(() => {
    if (!paystackConfig?.reference || !paystackConfig.amount) return;

    initializePayment(() => setMode('confirming'), dismiss);
  }, [paystackConfig]);

  const { mutate, isLoading: choosingPlan } = useChooseSubscriptionPlan({
    onSuccess(res) {
      if (res.status === 'pending' && !!res.reference) {
        return setPaystackConfig((prev) => ({
          ...prev,
          reference: res?.reference,
          amount: res?.amount,
          metadata: {
            intent: res?.intent,
          } as any,
        }));
      }

      onSuccess();
    },
    onError(e) {
      handleError(e);
      cancel();
    },
  });

  const paymentMethods = [
    {
      image: chequebase,
      id: 'wallet',
      title: 'ChequeBase Account',
      disabled: !primaryWallet,
      subTitle: `Balance: ${getAmountWithCurrency()}`,
    },
    {
      image: paystack,
      id: 'paystack',
      title: 'Paystack',
      subTitle: 'Pay with card, bank transfer etc',
    },
  ];

  function proceed(method: string, planId?: string, months?: number) {
    mutate({
      plan: planId ?? currentPlan?._id,
      months: months ?? currentPlanMonths,
      paymentMethod: method,
    });
  }

  function onSuccess() {
    dispatch({ type: 'update_has_choosen_plan', payload: true });
    getCurrentUser!(null);
    invalidate('balances', 'subscription', 'organization');
    setMode('success');
    setPaystackConfig(defaultPaystackConfig);
  }

  function dismiss() {
    setSelectedMethod('');
    setPaystackConfig(defaultPaystackConfig);
    setMode(null);
  }

  function cancel() {
    dismiss();
    setCurrentModalType(null);
  }

  function explorePlan() {
    push('/settings/license').then(() => cancel());
  }

  return {
    mode,
    setMode,
    selectedMethod,
    setSelectedMethod,
    paystackConfig,
    paymentMethods,
    proceed,
    onSuccess,
    dismiss,
    cancel,
    explorePlan,
    choosingPlan,
    isLoading,
    isError,
    data,
    plan: currentPlan,
  };
};

export interface ManageSubscriptionProps {
  currentModalType: TSubscriptionSummaryCurrentModalType;
  setCurrentModalType: Dispatch<
    SetStateAction<TSubscriptionSummaryCurrentModalType>
  >;
}

export type UseManageSubscription = ReturnType<typeof useManageSubscription>;
