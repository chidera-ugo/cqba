import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import Link from 'next/link';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ processing, formikProps }: Props) => {
  const { handleSubmit } = formikProps;

  return (
    <FormikForm onSubmit={handleSubmit} className='mt-10'>
      <Input
        label='Email Address'
        name='email'
        autoComplete='username'
        className='w-full'
      />

      <div className='mt-12 gap-5 640:flex'>
        <SubmitButton
          id='signup-submit-button'
          submitting={processing}
          className='dark-button w-full min-w-[200px] 640:w-auto'
        >
          Reset password
        </SubmitButton>

        <Link
          href='/signin'
          className='text-button my-auto mt-5 block w-full text-center text-base text-neutral-600 640:mt-auto 640:w-auto'
        >
          Return to Sign in
        </Link>
      </div>
    </FormikForm>
  );
};
