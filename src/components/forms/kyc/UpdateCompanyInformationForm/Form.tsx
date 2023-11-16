import { IsLoading } from 'components/data-states/IsLoading';
import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { IOrganization } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Select } from 'components/form-elements/Select';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useStatesAndLgas } from 'hooks/dashboard/kyc/useStatesAndLgas';
import { TooltipWrapper } from 'components/common/Tooltip';
import { useDismiss } from 'hooks/common/useDismiss';
import { useInView } from 'react-intersection-observer';
import { IdNavigator } from 'components/common/IdNavigator';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  setHasUnsavedChanges: Dispatch<SetStateAction<boolean>>;
  organizationInformation?: IOrganization;
  processing: boolean;
  gettingOrganizationInformation: boolean;
}

export const Form = ({
  processing,
  formikProps,
  setHasUnsavedChanges,
  organizationInformation,
  gettingOrganizationInformation,
}: Props) => {
  const { handleSubmit, errors, submitCount, setValues, values } = formikProps;

  const submitButtonId = 'update-company-information-submit-button';

  useScrollToFormError(errors, submitCount);

  const { states, lgas } = useStatesAndLgas({ state: values.state });

  const [dismiss, isDismissed, checkIsDismissed] =
    useDismiss('save_and_continue');

  const [isSaveAndContinueButtonVisible, setIsSaveAndContinueButtonVisible] =
    useState(false);

  const canShowSaveAndContinueTooltip =
    !checkIsDismissed() && !isDismissed && isSaveAndContinueButtonVisible;

  const { ref } = useInView({
    rootMargin: '-54px',
    onChange(inView) {
      setIsSaveAndContinueButtonVisible(inView);
    },
  });

  useEffect(() => {
    if (!organizationInformation) return;

    const {
      address,
      averageMonthlyExpenses,
      city,
      country,
      businessName,
      businessIndustry,
      state,
      numberOfEmployees,
      businessType,
    } = sanitizeRecordToRemoveUndefinedAndNulls(organizationInformation);

    setValues(
      {
        ...values,
        businessName,
        businessIndustry,
        address,
        companyType: businessType,
        expenses: averageMonthlyExpenses,
        employees: numberOfEmployees,
        city,
        state,
        country,
      },
      false
    );
  }, [organizationInformation]);

  function dismissSaveAndContinueTooltip() {
    dismiss();
  }

  if (gettingOrganizationInformation) return <IsLoading />;

  return (
    <FormikForm
      onChange={() => {
        setHasUnsavedChanges(true);
      }}
      onSubmit={handleSubmit}
    >
      <Input
        label='Company Name'
        placeholder={'Enter company name'}
        name='businessName'
      />

      <Select
        label='Business Type'
        name='companyType'
        options={[
          'BUSINESS_NAME_REGISTRATION',
          'INCORPORATED_TRUSTEES',
          'PRIVATE_LIMITED',
          'PUBLIC_LIMITED',
          'UNREGISTERED_INDIVIDUAL',
        ].map((val) => val.replaceAll('_', ' '))}
      />
      <Select
        label='Business Industry'
        name='businessIndustry'
        options={industries}
      />

      <div className='flex gap-5'>
        <Select
          label='Number of employees'
          name='employees'
          placeholder={'Select range'}
          options={['Less than 10', 'Between 11 and 50', 'More than 50']}
        />

        <Select
          label='Average monthly expenses'
          name='expenses'
          placeholder={'Select range'}
          options={[
            'Less than USD 5,000',
            'Between USD 5,000 and USD 50,000',
            'More than USD 50,000',
          ]}
        />
      </div>

      <Select
        placeholder={'Select country'}
        label='Country'
        name='country'
        options={['Nigeria']}
      />

      <Input
        label='Address'
        placeholder={'Enter business address'}
        name='address'
      />

      <div className='flex gap-5'>
        <Select
          placeholder={'Select state'}
          label='State'
          name='state'
          options={states}
        />
        <Select label='City' name='city' options={lgas} />
      </div>

      <div className='relative mt-10 flex'>
        <div id={submitButtonId} data-tooltip-delay-show={1000}>
          <SubmitButton
            submitting={processing}
            onClick={dismissSaveAndContinueTooltip}
            className='primary-button min-w-[170px]'
          >
            Save and Continue
          </SubmitButton>
        </div>

        <TooltipWrapper
          anchorId={submitButtonId}
          show={canShowSaveAndContinueTooltip}
          close={dismissSaveAndContinueTooltip}
        >
          Remember to save the changes you make on each section. Remember to
          save the changes you make on each section.
        </TooltipWrapper>
      </div>

      <div ref={ref} className='h-8'>
        <IdNavigator id='bottom-anchor' />
      </div>
    </FormikForm>
  );
};

const industries = [
  'Agriculture',
  'Auto Parts',
  'Construction',
  'Digital Services',
  'E-Commerce',
  'Electronics',
  'Fashion & Beauty',
  'Financial Services',
  'Food & Beverage',
  'Furniture',
  'General Services',
  'Haulage',
  'Hospitals & Health',
  'Household items',
  'Leisure & Entertainment',
  'Logistics',
  'Membership Groups',
  'NGOs',
  'Others',
  'Press & Media',
  'Religious Organizations',
  'Restaurant and Food',
  'Schools',
  'Technology',
  'Travel & Hospitality',
  'Utilities',
];
