import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';

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
        placeholder={'Enter email address'}
        autoComplete='username'
        className='w-full'
      />

      <div className='mt-12 gap-5 640:flex'>
        <SubmitButton
          id='reset-password-submit-button'
          submitting={processing}
          className='primary-button w-full min-w-[172px] 640:w-auto'
        >
          Reset password
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
