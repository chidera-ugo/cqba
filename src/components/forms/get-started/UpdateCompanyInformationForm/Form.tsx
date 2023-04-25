import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Select } from 'components/form-elements/Select';
import { useAppContext } from 'context/AppContext';
import { useEffect, useState } from 'react';
import { useStatesAndLgas } from 'hooks/dashboard/get-started/useStatesAndLgas';
import { TooltipWrapper } from 'components/common/Tooltip';
import { useDismiss } from 'hooks/common/useDismiss';
import UnsavedChangesPrompt from 'components/common/UnsavedChangesPrompt';
import { useInView } from 'react-intersection-observer';
import { IdNavigator } from 'components/common/IdNavigator';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ processing, formikProps }: Props) => {
  const { handleSubmit, setFieldValue, values } = formikProps;

  const { user } = useAppContext().state;
  const { states, lgas } = useStatesAndLgas({ state: values.state });

  const [dismiss, isDismissed] = useDismiss('save_and_continue');
  const submitButtonId = 'update-company-information-submit-button';
  const [isSaveAndContinueButtonVisible, setIsSaveAndContinueButtonVisible] =
    useState(false);

  const canShowSaveAndContinueTooltip =
    !isDismissed && isSaveAndContinueButtonVisible;

  const { ref } = useInView({
    rootMargin: '-54px',
    onChange(inView) {
      setIsSaveAndContinueButtonVisible(inView);
    },
  });

  useEffect(() => {
    if (user?.businessName) {
      setFieldValue('businessName', user.businessName);
    }
  }, [user]);

  return (
    <FormikForm onSubmit={handleSubmit} className='mt-7'>
      <UnsavedChangesPrompt hasUnsavedChanges />

      <h5>Company Information</h5>
      <p className='mt-1 font-normal text-neutral-400'>
        Provide your company information
      </p>

      <Select
        label={`What kind of company is ${user?.businessName}`}
        name='companyType'
        options={industries}
        className='mt-8 w-full'
      />

      <Input label='Business Name' name='businessName' className='w-full' />

      <Select
        label='Number of employees'
        name='employees'
        options={['', 'Less than 10', 'Between 11 and 50', 'More than 50']}
        className='w-full'
      />

      <Select
        label='Average monthly expenses'
        name='expenses'
        options={[
          '',
          'Less than USD 5,000',
          'Between USD 5,000 and USD 50,000',
          'More than USD 50,000',
        ]}
        className='w-full'
      />

      <h5 className='mt-10'>Verify your business location</h5>
      <p className='mt-1 font-normal text-neutral-400'>
        You will need to upload a copy of utility bill associated to this
        address in the documentation part of the onboarding.
      </p>

      <Input label='Address' name='address' className='w-full' />
      <Select label='State' name='state' options={states} />
      <Select label='City' name='city' next='address' options={lgas} />

      <div className='relative mt-10 flex'>
        <div id={submitButtonId} data-tooltip-delay-show={1000}>
          <SubmitButton
            submitting={processing}
            className='outline-button w-full min-w-[200px] 640:w-auto'
          >
            Save and Continue
          </SubmitButton>
        </div>

        <TooltipWrapper
          anchorId={submitButtonId}
          show={canShowSaveAndContinueTooltip}
          close={() => {
            dismiss(submitButtonId);
          }}
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
  '',
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
