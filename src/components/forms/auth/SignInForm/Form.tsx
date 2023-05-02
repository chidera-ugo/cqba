import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { PasswordInput } from 'components/form-elements/PasswordInput';
import Link from 'next/link';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ processing, formikProps }: Props) => {
  const { handleSubmit } = formikProps;

  return (
    <FormikForm onSubmit={handleSubmit} className='mt-7'>
      <Input
        label='Email Address'
        name='email'
        autoComplete='username'
        className='w-full'
      />

      <PasswordInput
        label='Password'
        name='password'
        type='password'
        autoComplete='new-password'
      />

      <div className='mt-4 text-left text-sm text-neutral-600'>
        <Link
          href='/forgot-password'
          className='text-button ml-1 text-left font-medium'
        >
          Forgot password?
        </Link>
      </div>

      <SubmitButton
        id='signin-submit-button'
        submitting={processing}
        className='dark-button mt-12 w-full min-w-[200px] 640:w-auto'
      >
        Sign in
      </SubmitButton>
    </FormikForm>
  );
};
