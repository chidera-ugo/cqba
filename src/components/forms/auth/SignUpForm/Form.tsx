import { Input } from 'components/form-elements/Input';
import { signupPasswordValidation } from 'components/forms/auth/SignUpForm/validationSchema';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { PasswordInput } from 'components/form-elements/PasswordInput';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ processing, formikProps }: Props) => {
  const { handleSubmit, setFieldValue, values } = formikProps;

  return (
    <FormikForm onSubmit={handleSubmit} className='mt-7'>
      <Input
        label='Business Name'
        placeholder={'Enter company name'}
        name='businessName'
        className='w-full'
      />

      <Input
        label='Email Address'
        placeholder={'Enter email address'}
        name='email'
        className='w-full'
      />

      <PasswordInput
        label='Password'
        name='password'
        type='password'
        autoComplete='new-password'
      />

      {values.password && <PasswordRequirements password={values.password} />}

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
            className='mr-1 h-16 w-16 rounded-lg'
          />
        </label>

        <span className='ml-1 mt-0.5 text-sm font-medium text-neutral-400 640:mt-1'>
          {`I agree to ChequeBase's `}
          <a className='text-button'>Privacy Policy</a> and{' '}
          <a className='text-button'>Terms of Use</a>
        </span>
      </div>

      <SubmitButton
        id='signup-submit-button'
        submitting={processing}
        disabled={!values.acceptedTerms}
        className='primary-button mt-5 w-full min-w-[200px] 640:w-auto'
      >
        Create an account
      </SubmitButton>
    </FormikForm>
  );
};

export const PasswordRequirements = ({ password }: { password: string }) => (
  <div className='mt-4 flex flex-wrap gap-2 rounded-xl border p-3 align-middle'>
    {signupPasswordValidation.map(({ check, name }) => {
      const isValid = typeof check === 'boolean' ? check : check(password);

      return (
        <div key={name} className={'flex py-1'}>
          <span className='my-auto mr-1.5'>
            {isValid ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='#1A44ED'
                className='h-4 w-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4.5 12.75l6 6 9-13.5'
                />
              </svg>
            ) : (
              <svg
                width='17'
                height='18'
                viewBox='0 0 17 18'
                fill='none'
                className={'h-4 w-4'}
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5.33828 4.93672C5.08932 4.68776 4.68568 4.68776 4.43672 4.93672C4.18776 5.18568 4.18776 5.58932 4.43672 5.83828L7.59844 9L4.43672 12.1617C4.18776 12.4107 4.18776 12.8143 4.43672 13.0633C4.68568 13.3122 5.08932 13.3122 5.33828 13.0633L8.5 9.90156L11.6617 13.0633C11.9107 13.3122 12.3143 13.3122 12.5633 13.0633C12.8122 12.8143 12.8122 12.4107 12.5633 12.1617L9.40156 9L12.5633 5.83828C12.8122 5.58932 12.8122 5.18568 12.5633 4.93672C12.3143 4.68776 11.9107 4.68776 11.6617 4.93672L8.5 8.09844L5.33828 4.93672Z'
                  fill='#F34141'
                />
              </svg>
            )}
          </span>
          <span className='my-auto text-xs leading-[12px] 640:text-sm'>
            {name}
          </span>
        </div>
      );
    })}
  </div>
);
