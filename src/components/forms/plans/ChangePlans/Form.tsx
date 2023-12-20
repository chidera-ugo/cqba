import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Select } from 'components/form-elements/Select';
import { Input } from 'components/form-elements/Input';
import { useEffect, useState } from 'react';
import { Tabs } from 'components/commons/Tabs';
import clsx from 'clsx';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useGetAllSubscriptionPlans } from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { formatAmount } from 'utils/formatters/formatAmount';
import { useChooseSubscriptionPlan } from 'hooks/api/subscriptions/useChooseSubscriptionPlan';
import { PaystackProps } from 'react-paystack/libs/types';
import { useAppContext } from 'context/AppContext';
import { useHandleError } from 'hooks/api/useHandleError';
import { useQueryInvalidator } from 'hooks/app/useQueryInvalidator';
import { usePaystackPayment } from 'react-paystack';
import { ConfirmPaymentIntentStatus } from 'components/modules/subscriptions/ConfirmPaymentIntentStatus';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { GreenCheck } from 'components/illustrations/Success';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  close: () => void;
}

const tabs = [
  { name: 'Monthly', value: 'MONTHLY' },
  { name: 'Yearly (30% Off)', value: 'YEARLY' },
];

export const Form = ({ formikProps, close }: Props) => {
  const { getCurrentUser, dispatch, state } = useAppContext();

  const { handleError } = useHandleError();

  const [mode, setMode] = useState<'success' | 'confirming' | 'choose_method'>(
    'choose_method'
  );
  const { setFieldValue, values } = formikProps;
  const [currentTab, setCurrentTab] = useState(tabs[0]!);
  const { data: organization } = useGetOrganizationInformation();
  const { isLoading, isError, data } = useGetAllSubscriptionPlans();
  const { primaryWallet } = useManageWallets();

  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(
    undefined
  );

  const months = currentTab.value == 'MONTHLY' ? 1 : 12;
  const { invalidate } = useQueryInvalidator();

  const defaultPaystackConfig: PaystackProps = {
    email: state?.user?.email ?? '',
    amount: 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const [paystackConfig, setPaystackConfig] = useState<PaystackProps>(
    defaultPaystackConfig
  );

  const initializePayment = usePaystackPayment(paystackConfig);

  const [selectedMethod, setSelectedMethod] = useState('');

  useEffect(() => {
    if (!paystackConfig?.reference || !paystackConfig.amount) return;

    initializePayment(() => setMode('confirming'), dismiss);
    console.log('paystack working');
  }, [paystackConfig]);

  const methods = [
    {
      id: 'wallet',
      title: 'ChequeBase Account',
      subTitle: !primaryWallet
        ? 'Balance: '
        : `Balance: ${primaryWallet?.currency}${formatAmount({
            value: primaryWallet?.balance,
          })}`,
    },
    {
      id: 'paystack',
      title: 'Paystack',
      subTitle: 'Pay with card, bank transfer etc',
    },
  ];

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

  useEffect(() => {
    if (values.plan != '') {
      const selected = data?.filter((x) => values.plan === x.name);
      if (selected) {
        setSelectedPlan(selected[0]?._id);
      }
      values.paymentMethod != ''
        ? setSelectedMethod(values.paymentMethod)
        : setSelectedMethod('');
    }
    console.log('val', values);
  }, [values]);

  if (isError)
    return (
      <IsError
        className={'py-20'}
        description={'An error occurred initializing dashboard'}
      />
    );

  if (isLoading) {
    return <IsLoading />;
  }

  function proceed(method: string) {
    mutate({
      plan: selectedPlan,
      months,
      paymentMethod: method,
    });
  }

  function onSuccess() {
    dispatch({ type: 'update_has_choosen_plan', payload: true });
    getCurrentUser!(null);
    invalidate('balances', 'subscription');
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
    close();
  }

  console.log(data);

  console.log('act', mode);

  return (
    <FormikForm>
      {mode === 'success' ? (
        <SimpleInformation
          className={'mt-20'}
          icon={<GreenCheck />}
          title={
            <span className='mx-auto block max-w-[240px] text-xl'>
              Subscription Successful
            </span>
          }
          description={`You have successfully subscribed to a new plan`}
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
          <div className={clsx('my-10 w-fit', 'flex-shrink-0')}>
            <Tabs
              className={'rounded-full'}
              sliderClassname={'rounded-full'}
              tabClassname={'w-fit'}
              layoutId={'plan_type'}
              tabs={tabs}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
          <Input
            label='Business Name'
            name='businessName'
            placeholder={organization?.businessName}
            disabled
          />
          <Select
            name='plan'
            label={'Select Plan'}
            trueValueKey={'value'}
            displayValueKey={'name'}
            options={data}
            setFieldValue={setFieldValue}
          />
          <Select
            name='paymentMethod'
            label={'Payment Method'}
            trueValueKey={'id'}
            displayValueKey={'title'}
            options={methods}
            setFieldValue={setFieldValue}
          />

          <div className='mt-8 flex'>
            <SubmitButton
              submitting={choosingPlan}
              type={'button'}
              className='primary-button w-full min-w-[120px] 640:w-auto'
              onClick={() => {
                if (!selectedMethod) return;
                proceed(selectedMethod);
              }}
            >
              Complete Payment
            </SubmitButton>
          </div>
        </>
      )}
    </FormikForm>
  );
};
