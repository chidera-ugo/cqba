import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Select } from 'components/form-elements/Select';
import { PhoneNumberInput } from 'components/form-elements/PhoneNumberInput';
import { PasswordInput } from 'components/form-elements/PasswordInput';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ processing, formikProps }: Props) => {
  const { handleSubmit, setFieldValue, values } = formikProps;

  return (
    <FormikForm onSubmit={handleSubmit} className='mt-7'>
      <div className='gap-4 880:flex'>
        <Input label='First Name' name='firstName' className='w-full' />
        <Input label='Last Name' name='lastName' className='w-full' />
      </div>

      <Input label='Business Name' name='businessName' className='w-full' />

      <Select
        label='Industry'
        name='industry'
        options={industries}
        className='w-full'
      />

      <Input label='Email Address' name='email' className='w-full' />

      <PhoneNumberInput
        label='Phone Number'
        name='phoneNumber'
        setFieldValue={setFieldValue}
        inputMode='tel'
        shouldValidate
      />

      <PasswordInput
        label='Password'
        name='password'
        type='password'
        autoComplete='new-password'
      />

      <div className='mt-8 flex'>
        <label
          className='relative mt-1 flex cursor-pointer'
          htmlFor={'accept-terms'}
        >
          <input
            type='checkbox'
            checked={values.acceptedTerms}
            onChange={() =>
              setFieldValue('acceptedTerms', !values.acceptedTerms)
            }
            id='accept-terms'
            className='mr-1'
          />
        </label>

        <span className='mt-1 ml-1 text-sm font-medium text-neutral-400'>
          {`I agree to ChequeBase's `}
          <a className='text-button'>Privacy Policy</a> and{' '}
          <a className='text-button'>Terms of Use</a>
        </span>
      </div>

      <SubmitButton
        id='signup-submit-button'
        submitting={processing}
        disabled={!values.acceptedTerms}
        className='dark-button mt-12 w-full min-w-[200px] 640:w-auto'
      >
        Create an account
      </SubmitButton>
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
