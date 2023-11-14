import { PasswordRequirements } from 'components/forms/auth/SignUpForm/Form';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { PasswordInput } from 'components/form-elements/PasswordInput';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ processing, formikProps }: Props) => {
  const { handleSubmit, values } = formikProps;

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

      {values.password && <PasswordRequirements password={values.password} />}

      <SubmitButton
        id='new-password-submit-button'
        submitting={processing}
        className='primary-button mt-12 w-full min-w-[200px] 640:w-auto'
      >
        Set new password
      </SubmitButton>
    </FormikForm>
  );
};
