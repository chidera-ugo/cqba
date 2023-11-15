import { Input } from 'components/form-elements/Input';
import { ToggleSwitch } from 'components/form-elements/ToggleSwitch';
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
        autoFocus
        label='Email Address'
        name='email'
        placeholder={'Enter email address'}
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
          href='/auth/forgot-password'
          className='text-button ml-1 text-left font-medium'
        >
          Forgot password?
        </Link>
      </div>

      <ToggleSwitch name='stayLoggedIn' label='Remember me?' className='mt-4' />

      <SubmitButton
        id='signin-submit-button'
        submitting={processing}
        className='primary-button mt-12 w-full min-w-[200px] 640:w-auto'
      >
        Sign in
      </SubmitButton>
    </FormikForm>
  );
};
