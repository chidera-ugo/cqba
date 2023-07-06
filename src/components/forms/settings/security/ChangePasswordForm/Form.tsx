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
    <FormikForm onSubmit={handleSubmit}>
      <PasswordInput
        label='Current Password'
        name='currentPassword'
        className='mt-8'
        autoFocus
      />

      <PasswordInput
        label='New Password'
        name='newPassword'
        autoComplete='new-passwords'
        className='mt-4'
      />

      <PasswordInput
        label='Confirm New Password'
        name='confirmPassword'
        autoComplete='new-passwords'
        className='mt-4'
      />

      <div className='mt-8 flex justify-end'>
        <SubmitButton
          id='reset-password-submit-button'
          submitting={processing}
          className='dark-button w-full min-w-[200px] 640:w-auto'
        >
          Reset password
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
