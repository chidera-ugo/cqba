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
  role?: string;
}

export const Form = ({
  processing,
  role,
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

  const isActive = currentEmployee?.status === 'active';

  useScrollToFormError(errors, submitCount);

  useEffect(() => {
    if (!formRecoveryValues) return;

    const { email, role, phoneNumber } =
      sanitizeRecordToRemoveUndefinedAndNulls(
        formRecoveryValues as typeof initialValues
      );

    setValues(
      {
        ...values,
        email,
        role,
        phoneNumber,
      },
      false
    );
  }, [formRecoveryValues]);

  useEffect(() => {
    if (!role) return;

    setFieldValue('role', role);
  }, [role]);

  useEffect(() => {
    if (!currentEmployee) return;

    const { email, role, phone } =
      sanitizeRecordToRemoveUndefinedAndNulls(currentEmployee);

    setValues(
      {
        ...values,
        email,
        phoneNumber: phone,
        role: role === 'owner' ? '' : role,
      },
      false
    );
  }, [currentEmployee, formRecoveryValues]);

  return (
    <FormikForm onSubmit={handleSubmit}>
      {!isActive && (
        <>
          <Input lazyFocus label='Email' name='email' />

          <PhoneNumberInput
            label='Phone Number (Optional)'
            name='phoneNumber'
            setFieldValue={setFieldValue}
            inputMode='tel'
            shouldValidate
          />
        </>
      )}

      <Select
        name={'role'}
        label={'Role'}
        trueValueKey={'value'}
        displayValueKey={'name'}
        options={[
          { name: 'Owner', value: 'owner' },
          { name: 'Employee', value: 'employee' },
        ]}
      />

      <div className='relative mt-10 flex pb-8'>
        <SubmitButton
          submitting={processing}
          className='primary-button min-w-[140px]'
        >
          {`${currentEmployee ? 'Update' : 'Add'} Employee`}
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
