import { Input } from 'components/form-elements/Input';
import { PasswordInput } from 'components/form-elements/PasswordInput';
import { PhoneNumberInput } from 'components/form-elements/PhoneNumberInput';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ processing, formikProps }: Props) => {
  const { handleSubmit, setFieldValue } = formikProps;

  return (
    <FormikForm onSubmit={handleSubmit} className='mt-7'>
      <div className='gap-4 880:flex'>
        <Input autoFocus label='First Name' name='firstName' />
        <Input label='Last Name' name='lastName' />
      </div>

      <PhoneNumberInput
        label='Phone Number'
        name='phoneNumber'
        setFieldValue={setFieldValue}
        inputMode='tel'
        shouldValidate
      />

      <PasswordInput
        label='Create Password (6 digit pin)'
        name='password'
        setFieldValue={setFieldValue}
        type='text'
        inputMode='tel'
        autoComplete='off'
        next={'idType'}
        fieldType='idNumber'
        limit={6}
        shouldValidate
      />

      <SubmitButton
        submitting={processing}
        className='primary-button mt-12 w-full min-w-[120px] 640:w-auto'
      >
        Join Organisation
      </SubmitButton>
    </FormikForm>
  );
};
