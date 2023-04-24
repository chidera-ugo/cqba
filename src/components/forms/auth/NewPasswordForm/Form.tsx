import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { PasswordInput } from 'components/form-elements/PasswordInput';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ processing, formikProps }: Props) => {
  const { handleSubmit } = formikProps;

  return (
    <FormikForm onSubmit={handleSubmit} className='mt-10'>
      <PasswordInput
        label='Password'
        name='password'
        autoComplete='new-password'
        className='mt-4'
      />

      <PasswordInput
        label='Confirm password'
        name='confirmPassword'
        type='password'
        autoComplete='new-password'
        className='mt-4'
      />

      <SubmitButton
        id='signup-submit-button'
        submitting={processing}
        className='dark-button mt-12 w-full min-w-[200px] 640:w-auto'
      >
        Set new password
      </SubmitButton>
    </FormikForm>
  );
};
