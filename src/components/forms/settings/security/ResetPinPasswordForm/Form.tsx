import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { PasswordInput } from 'components/form-elements/PasswordInput';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing?: boolean;
}

export const Form = ({ formikProps, processing }: Props) => {
  const { handleSubmit } = formikProps;

  return (
    <FormikForm onSubmit={handleSubmit} className={'-mt-4'}>
      <PasswordInput
        autoFocus
        label='Password'
        name='password'
        autoComplete='new-password'
      />

      <SubmitButton
        id='reset_password-submit-button'
        submitting={processing}
        className='primary-button mt-8 w-[140px]'
      >
        Proceed
      </SubmitButton>
    </FormikForm>
  );
};
