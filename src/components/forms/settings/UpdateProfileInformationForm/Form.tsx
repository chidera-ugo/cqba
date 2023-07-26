import { Input } from 'components/form-elements/Input';
import { PhoneNumberInput } from 'components/form-elements/PhoneNumberInput';
import { useAppContext } from 'context/AppContext';
import { Form as FormikForm, FormikProps } from 'formik';
import { useEffect } from 'react';
import { formatPhoneNumber } from 'utils/formatters/formatPhoneNumber';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
}

export const Form = ({ formikProps }: Props) => {
  const { handleSubmit, values, setValues, setFieldValue } = formikProps;

  const { user } = useAppContext().state;

  useEffect(() => {
    const { firstName, lastName, phone } =
      sanitizeRecordToRemoveUndefinedAndNulls(user!);

    setValues({
      ...values,
      firstName,
      lastName,
      phoneNumber: formatPhoneNumber(phone),
    });
  }, []);

  return (
    <FormikForm onSubmit={handleSubmit} className={'max-w-[420px]'}>
      <div className='gap-4 880:flex'>
        <Input label='First Name' name='firstName' />
        <Input label='Last Name' name='lastName' />
      </div>

      <PhoneNumberInput
        label='Phone Number'
        name='phoneNumber'
        setFieldValue={setFieldValue}
        inputMode='tel'
        shouldValidate
      />
    </FormikForm>
  );
};
