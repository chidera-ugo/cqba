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
      businessAddress,
      averageMonthlyExpenses,
      city,
      businessName,
      industry,
      state,
      numberOfEmployees,
    } = sanitizeRecordToRemoveUndefinedAndNulls(organizationInformation);

    setValues(
      {
        ...values,
        businessName,
        address: businessAddress,
        companyType: industry,
        expenses: averageMonthlyExpenses,
        employees: numberOfEmployees,
        city,
        state,
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
      <Select
        label={`What kind of company is ${
          organizationInformation?.businessName ?? 'this'
        }`}
        name='companyType'
        options={industries}
      />

      <Input label='Business Name' name='businessName' />

      <Select
        label='Number of employees'
        name='employees'
        options={['Less than 10', 'Between 11 and 50', 'More than 50']}
      />

      <Select
        label='Average monthly expenses'
        name='expenses'
        options={[
          'Less than USD 5,000',
          'Between USD 5,000 and USD 50,000',
          'More than USD 50,000',
        ]}
      />

      <h5 className='mt-10'>Verify your business location</h5>
      <p className='mt-1 font-normal text-neutral-400'>
        You will need to upload a copy of utility bill associated to this
        address in the documentation part of the onboarding.
      </p>

      <Input label='Address' name='address' />
      <Select label='State' name='state' options={states} />
      <Select label='City' name='city' next='address' options={lgas} />

      <div className='relative mt-10 flex'>
        <div id={submitButtonId} data-tooltip-delay-show={1000}>
          <SubmitButton
            submitting={processing}
            onClick={dismissSaveAndContinueTooltip}
            className='outline-button min-w-[200px]'
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
