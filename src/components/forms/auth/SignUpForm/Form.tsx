import { Input } from 'components/form-elements/Input';
import { PasswordRequirementsCheckList } from 'components/modules/auth/PasswordRequirementsCheckList';
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
    <FormikForm onSubmit={handleSubmit} className='mt-7'>
      <Input
        label='Business Name'
        placeholder={'Enter business name'}
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

      {values.password && (
        <PasswordRequirementsCheckList password={values.password} />
      )}

      <SubmitButton
        id='signup-submit-button'
        submitting={processing}
        className='primary-button mt-5 w-full'
      >
        Create an account
      </SubmitButton>

      <div className='x-center mt-4'>
        <div className='mx-auto w-full text-center text-xs text-neutral-400 640:text-sm'>
          {`I agree to ChequeBase's `}
          <a className='text-button'>Privacy Policy</a> and{' '}
          <a className='text-button'>Terms of Use</a>
        </div>
      </div>
    </FormikForm>
  );
};
