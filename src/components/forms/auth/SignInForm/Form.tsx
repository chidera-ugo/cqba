import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { useEffect } from 'react';
import { getCookie, saveCookie } from 'utils/handlers/handleCookies';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { PasswordInput } from 'components/form-elements/PasswordInput';
import Link from 'next/link';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ processing, formikProps }: Props) => {
  const { handleSubmit, values, setFieldValue } = formikProps;

  useEffect(() => {
    const rememberMe = getCookie('rememberMe');

    if (!rememberMe || !rememberMe.value) return;

    setFieldValue('rememberMe', rememberMe.value);
  }, []);

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

      <div className='x-between mt-4'>
        <label
          className='relative my-auto flex cursor-pointer gap-1.5'
          htmlFor={'rememberMe'}
        >
          <input
            type='checkbox'
            checked={values.rememberMe}
            onChange={() => {
              setFieldValue('rememberMe', !values.rememberMe);
              saveCookie('rememberMe', { value: !values.rememberMe });
            }}
            id='rememberMe'
            className='my-auto'
          />
          <span className={'my-auto text-sm font-normal'}>Remember me</span>
        </label>

        <Link
          href='/auth/forgot-password'
          className='text-button my-auto text-left text-sm font-medium text-primary-main'
        >
          Forgot password?
        </Link>
      </div>

      <SubmitButton
        id='signin-submit-button'
        submitting={processing}
        className='primary-button mt-12 w-full min-w-[120px] 640:w-auto'
      >
        Sign in
      </SubmitButton>
    </FormikForm>
  );
};
