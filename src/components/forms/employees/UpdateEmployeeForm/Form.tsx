import { Input } from 'components/form-elements/Input';
import { PhoneNumberInput } from 'components/form-elements/PhoneNumberInput';
import { Select } from 'components/form-elements/Select';
import { Form as FormikForm, FormikProps } from 'formik';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { useEffect } from 'react';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  formRecoveryValues?: Record<string, any> | null;
  currentEmployee?: IEmployee | null;
}

export const Form = ({
  processing,
  formikProps,
  currentEmployee,
  formRecoveryValues,
}: Props) => {
  const {
    handleSubmit,
    setFieldValue,
    setValues,
    values,
    errors,
    submitCount,
  } = formikProps;

  useScrollToFormError(errors, submitCount);

  useEffect(() => {
    if (!formRecoveryValues) return;

    const { firstName, lastName, email, role, phoneNumber } =
      sanitizeRecordToRemoveUndefinedAndNulls(
        formRecoveryValues as typeof initialValues
      );

    setValues(
      {
        ...values,
        firstName,
        lastName,
        email,
        role,
        phoneNumber,
      },
      false
    );
  }, [formRecoveryValues]);

  useEffect(() => {
    if (!currentEmployee) return;

    const { firstName, lastName, email, role, phone } =
      sanitizeRecordToRemoveUndefinedAndNulls(currentEmployee);

    setValues(
      {
        ...values,
        firstName,
        lastName,
        email,
        phoneNumber: phone,
        role,
      },
      false
    );
  }, [currentEmployee, formRecoveryValues]);

  return (
    <FormikForm onSubmit={handleSubmit}>
      <div className='gap-4 880:flex'>
        <Input autoFocus label='First Name' name='firstName' />
        <Input label='Last Name' name='lastName' />
      </div>

      <Input label='Email' name='email' />

      <PhoneNumberInput
        label='Phone Number (Optional)'
        name='phoneNumber'
        setFieldValue={setFieldValue}
        inputMode='tel'
        shouldValidate
      />

      <Select
        name={'role'}
        label={'Role'}
        options={['OWNER', 'CFO', 'EMPLOYEE']}
      />

      <div className='relative mt-10 flex pb-8'>
        <SubmitButton
          submitting={processing}
          className='primary-button min-w-[140px]'
        >
          {currentEmployee ? 'Update' : 'Add'} Employee
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
