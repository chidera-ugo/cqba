import { choosePlanTabs } from 'components/modules/settings/license/ChooseInitialSubscriptionPlan';
import { Form as FormikForm, FormikProps } from 'formik';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';
import { useGetAllSubscriptionPlans } from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useState } from 'react';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Select } from 'components/form-elements/Select';
import { Input } from 'components/form-elements/Input';
import { Tabs } from 'components/commons/Tabs';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing?: boolean;
}

export const Form = ({ formikProps, processing }: Props) => {
  const { setFieldValue } = formikProps;

  const [currentTab, setCurrentTab] = useState(choosePlanTabs[0]!);

  const { getAmountWithCurrency } = useManageWallets();

  const { data: organization } = useGetOrganizationInformation();

  const { data, isLoading, isError, isRefetching, refetch } =
    useGetAllSubscriptionPlans();

  const {
    isLoading: _l,
    isError: _e,
    data: activePlan,
  } = useGetActiveSubscription();

  return (
    <FormikForm>
      <div className='w-fit'>
        <Tabs
          className={'rounded-full'}
          sliderClassname={'rounded-full'}
          tabClassname={'w-fit'}
          layoutId={'change_plan_form_tabs'}
          tabs={choosePlanTabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          action={(tab) => {
            setFieldValue('monthlyPlan', tab.value === 'MONTHLY');
          }}
        />
      </div>

      <div className='h-6'></div>

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
        options={
          data
            ?.filter(({ amount }) => {
              if (!activePlan) return false;
              return amount.NGN > activePlan?.plan?.amount?.NGN;
            })
            ?.map(({ name, _id, amount }) => {
              const _val = amount.NGN;

              return {
                name: `${name} - ${getAmountWithCurrency(
                  currentTab.value === 'MONTHLY' ? _val : _val * 12 * 0.7
                )}`,
                value: _id,
              };
            }) ?? []
        }
        {...{
          refetch,
        }}
        isError={isError || _e}
        isLoading={isLoading || _l || (isRefetching && !data)}
        setFieldValue={setFieldValue}
      />

      <Select
        name='paymentMethod'
        label={'Payment Method'}
        trueValueKey={'value'}
        displayValueKey={'name'}
        options={[
          {
            name: `Wallet Balance - ${getAmountWithCurrency()}`,
            value: 'wallet',
          },
          {
            name: 'Paystack',
            value: 'paystack',
          },
        ]}
        setFieldValue={setFieldValue}
      />

      <div className='mt-8 flex'>
        <SubmitButton
          type={'submit'}
          submitting={processing}
          className='primary-button w-full 640:w-[160px]'
        >
          Complete Payment
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
