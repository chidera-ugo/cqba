import { IsLoading } from 'components/data-states/IsLoading';
import { AddressInputGroup } from 'components/form-elements/AddressInputGroup';
import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { IOrganization } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import Link from 'next/link';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Select } from 'components/form-elements/Select';
import { useEffect } from 'react';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  organizationInformation?: IOrganization;
  processing: boolean;
  gettingOrganizationInformation: boolean;
}

export const Form = ({
  processing,
  formikProps,
  organizationInformation,
  gettingOrganizationInformation,
}: Props) => {
  const { handleSubmit, errors, submitCount, setValues, values } = formikProps;

  useScrollToFormError(errors, submitCount);

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

  if (gettingOrganizationInformation) return <IsLoading />;

  return (
    <FormikForm onSubmit={handleSubmit}>
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

      <div className='gap-5 480:flex'>
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

      <AddressInputGroup country={values.country} />

      <div className={'mt-10 pb-8'}>
        <div className='relative flex'>
          <SubmitButton
            submitting={processing}
            className='primary-button w-full min-w-[170px] 640:w-min'
          >
            Save and Continue
          </SubmitButton>
        </div>

        <Link
          href={'/kyc?tab=review-and-submit&showSteps=true'}
          className='x-center mx-auto mt-4 flex w-full py-2 text-center text-sm font-medium 640:hidden'
        >
          Skip for later
        </Link>
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
