import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { AnimateLayout } from 'components/animations/AnimateLayout';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { GreenCheck } from 'components/illustrations/Success';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import paystack from '/public/assets/settings/paystack.jpg';
import chequebase from '/public/assets/settings/chequebase.jpg';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { ConfirmPaymentIntentStatus } from 'components/modules/subscriptions/ConfirmPaymentIntentStatus';
import { RadioOff, RadioOn } from 'components/svgs/others/Radio';
import { useAppContext } from 'context/AppContext';
import { useChooseSubscriptionPlan } from 'hooks/api/subscriptions/useChooseSubscriptionPlan';
import { SubscriptionPlan } from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import Image from 'next/image';
import { useRouter } from 'next/router';
import process from 'process';
import { useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { PaystackProps } from 'react-paystack/libs/types';
import { formatAmount } from 'utils/formatters/formatAmount';

interface Props {
  selectedPlan: SubscriptionPlan | null;
  close: () => void;
  show: boolean;
  months: number;
}

export const ChoosePaymentMethod = ({
  selectedPlan,
  show,
  months,
  close,
}: Props) => {
  const { getCurrentUser, dispatch, state } = useAppContext();

  const [mode, setMode] = useState<'success' | 'confirming' | 'choose_method'>(
    'choose_method'
  );

  const defaultPaystackConfig: PaystackProps = {
    email: state?.user?.email ?? '',
    amount: selectedPlan?.amount?.NGN ?? 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const [selectedMethod, setSelectedMethod] = useState('');

  const [paystackConfig, setPaystackConfig] = useState<PaystackProps>(
    defaultPaystackConfig
  );

  const { push } = useRouter();

  const { primaryWallet } = useManageWallets();

  const initializePayment = usePaystackPayment(paystackConfig);

  const queryClient = useQueryClient();

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
  });

  const methods = [
    {
      image: chequebase,
      id: 'wallet',
      title: 'ChequeBase Account',
      subTitle: `Balance: ${primaryWallet?.currency}${formatAmount({
        value: primaryWallet?.balance,
      })}`,
    },
    {
      image: paystack,
      id: 'paystack',
      title: 'Paystack',
      subTitle: 'Pay with card, bank transfer etc',
    },
  ];

  function onSuccess() {
    dispatch({ type: 'update_has_choosen_plan', payload: true });

    getCurrentUser!(null);

    queryClient.invalidateQueries(['subscription_history']);
    queryClient.invalidateQueries(['current_subscription_plan']);
    queryClient.invalidateQueries(['dashboard_overview']);
    queryClient.invalidateQueries(['wallets']);

    setMode('success');
  }

  function dismiss() {
    setSelectedMethod('');
    setPaystackConfig(defaultPaystackConfig);
    setMode('choose_method');
  }

  function cancel() {
    dismiss();
    close();
  }

  function explorePlan() {
    push('/settings/license').then(() => cancel());
  }

  return (
    <RightModalWrapper
      show={show}
      title={mode === 'choose_method' ? 'Select Payment Option' : ''}
      closeModal={cancel}
    >
      <AnimateLayout changeTracker={mode}>
        {mode === 'success' ? (
          <SimpleInformation
            className={'mt-20'}
            icon={<GreenCheck />}
            title={
              <span className='mx-auto block max-w-[240px] text-xl'>
                Subscription Successful
              </span>
            }
            description={`You have successfully subscribed to ${selectedPlan?.name}`}
            actionButton={{
              text: 'Explore Plan',
              action: explorePlan,
            }}
          />
        ) : mode === 'confirming' ? (
          <ConfirmPaymentIntentStatus
            onError={dismiss}
            onSuccess={onSuccess}
            intentId={paystackConfig?.metadata?.intent}
          />
        ) : (
          <>
            {methods?.map(({ id, image, title, subTitle }) => {
              return (
                <button
                  onClick={() => setSelectedMethod(id)}
                  type={'button'}
                  key={id}
                  className={clsx(
                    'card x-between mb-4 w-full p-4 text-left',
                    selectedMethod === id && 'border-[#1A44ED7A]'
                  )}
                >
                  <div className={'flex gap-3'}>
                    <Image
                      style={{
                        height: 45,
                        width: 45,
                      }}
                      className={'flex-shrink-0'}
                      alt={id}
                      src={image}
                    />

                    <div>
                      <h5 className={'text-base'}>{title}</h5>
                      <p className={'text-sm'}>{subTitle}</p>
                    </div>
                  </div>

                  <div className={'my-auto'}>
                    {selectedMethod === id ? <RadioOn /> : <RadioOff />}
                  </div>
                </button>
              );
            })}

            <div className='mt-5 flex gap-2'>
              <SubmitButton
                submitting={choosingPlan}
                type={'button'}
                disabled={!selectedMethod}
                onClick={() => {
                  if (!selectedMethod) return;

                  mutate({
                    plan: selectedPlan?._id,
                    months,
                    paymentMethod: selectedMethod,
                  });
                }}
                className={'primary-button w-[100px]'}
              >
                Continue
              </SubmitButton>

              <button
                onClick={cancel}
                type={'button'}
                className={'secondary-button'}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </AnimateLayout>
    </RightModalWrapper>
  );
};
