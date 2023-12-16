import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Select } from 'components/form-elements/Select';
import { Input } from 'components/form-elements/Input';
import { useState } from 'react';
import { Tabs } from 'components/commons/Tabs';
import clsx from 'clsx';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useGetAllSubscriptionPlans } from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { formatAmount } from 'utils/formatters/formatAmount';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

const tabs = [
  { name: 'Monthly', value: 'MONTHLY' },
  { name: 'Yearly (30% Off)', value: 'YEARLY' },
];

export const Form = ({ formikProps, processing }: Props) => {
  const { handleSubmit } = formikProps;
  const [currentTab, setCurrentTab] = useState(tabs[0]!);
  const { data: organization } = useGetOrganizationInformation();
  const { isLoading, isError, data } = useGetAllSubscriptionPlans();
  const { primaryWallet } = useManageWallets();

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

  return (
    <FormikForm onSubmit={handleSubmit}>
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
        name={'plan'}
        label={'Select Plan'}
        trueValueKey={'value'}
        displayValueKey={'name'}
        options={data}
      />
      <Select
        name={'paymentMethod'}
        label={'Payment Method'}
        trueValueKey={'id'}
        displayValueKey={'title'}
        options={methods}
      />

      <div className='mt-8 flex'>
        <SubmitButton
          submitting={processing}
          className='primary-button w-full min-w-[120px] 640:w-auto'
        >
          Complete Payment
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
