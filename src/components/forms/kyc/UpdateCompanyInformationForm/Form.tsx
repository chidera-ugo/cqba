import clsx from 'clsx';
import { IsLoading } from 'components/data-states/IsLoading';
import { AddressInputGroup } from 'components/form-elements/AddressInputGroup';
import { Input } from 'components/form-elements/Input';
import { PhoneNumberInput } from 'components/form-elements/PhoneNumberInput';
import { Select } from 'components/form-elements/Select';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { industries } from 'constants/kyc/industries';
import { Business_typeEnum } from 'enums/business_type.enum';
import { Form as FormikForm, FormikProps } from 'formik';
import { IOrganization } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import Link from 'next/link';
import { useEffect } from 'react';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';

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
  const {
    handleSubmit,
    errors,
    setFieldValue,
    submitCount,
    setValues,
    values,
  } = formikProps;

  useScrollToFormError(errors, submitCount);

  useEffect(() => {
    if (!organizationInformation?.businessName) return;

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
      phone,
      postalCode,
      tin,
      businessNumber,
      rcNumber,
      cacItNumber,
    } = sanitizeRecordToRemoveUndefinedAndNulls(organizationInformation);

    setValues(
      {
        ...values,
        businessIndustry,
        address,
        companyType: businessType,
        expenses: averageMonthlyExpenses,
        employees: numberOfEmployees,
        city,
        state,
        tin,
        businessNumber,
        rcNumber,
        cacItNumber,
        country,
        postalCode,
        businessName,
        phoneNumber: phone ?? '',
      },
      false
    );
  }, [organizationInformation]);

  if (gettingOrganizationInformation) return <IsLoading />;

  const isPrivateOrPublic =
    values.companyType === Business_typeEnum.private ||
    values.companyType === Business_typeEnum.public;

  return (
    <FormikForm onSubmit={handleSubmit}>
      <Input
        label={clsx(
          values.companyType === Business_typeEnum.individual
            ? 'Trading Name'
            : 'Business Name'
        )}
        placeholder={`Enter $1`}
        name='businessName'
      />

      <Select
        label='Business Type'
        name='companyType'
        options={[
          { name: 'BUSINESS NAME REGISTRATION', id: 'Business_Name' },
          { name: 'INCORPORATED TRUSTEES', id: 'Incorporated_Trustees' },
          { name: 'PRIVATE LIMITED', id: 'Private_Incorporated' },
          { name: 'PUBLIC LIMITED', id: 'Public_Incorporated' },
          { name: 'UNREGISTERED INDIVIDUAL', id: 'Free_Zone' },
        ]}
        displayValueKey={'name'}
        trueValueKey={'id'}
      />

      <Select
        label='Business Industry'
        name='businessIndustry'
        options={industries}
      />

      {isPrivateOrPublic ? (
        <Input label='Tax Identification Number' name='tin' />
      ) : null}

      {values.companyType === Business_typeEnum.businessName && (
        <Input label='Business Number (BN)' name='businessNumber' />
      )}

      {isPrivateOrPublic ? <Input label='RC Number' name='rcNumber' /> : null}

      {values.companyType === Business_typeEnum.trustees && (
        <Input label='CAC/IT Number' name='cacItNumber' />
      )}

      <PhoneNumberInput
        label='Phone Number'
        name='phoneNumber'
        setFieldValue={setFieldValue}
        inputMode='tel'
        shouldValidate
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

      <AddressInputGroup country={values.country} state={values.state} />

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
