import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { CustomSelect } from 'components/form-elements/CustomSelect';
import { SecondaryActionButton } from 'components/form-elements/CustomSelect/SecondaryActionButton';
import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useGetAllDepartments } from 'hooks/api/departments/useGetAllDepartments';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { useEffect } from 'react';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  addDepartment?: (values: Record<string, any>) => void;
  formRecoveryValues?: Record<string, any> | null;
  currentEmployee?: IEmployee | null;
}

export const Form = ({
  processing,
  formikProps,
  addDepartment,
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
    if (!currentEmployee && !formRecoveryValues) return;

    const { firstName, lastName, email, departmentId } =
      sanitizeRecordToRemoveUndefinedAndNulls(
        currentEmployee ?? (formRecoveryValues as typeof initialValues)
      );

    setValues({
      ...values,
      firstName,
      lastName,
      email,
      departmentId,
    });
  }, [currentEmployee, formRecoveryValues]);

  const {
    isLoading: gettingDepartments,
    isError: failedToGetDepartments,
    data: departments,
  } = useGetAllDepartments();

  return (
    <FormikForm onSubmit={handleSubmit}>
      <div className='gap-4 880:flex'>
        <Input autoFocus label='First Name' name='firstName' />
        <Input label='Last Name' name='lastName' />
      </div>

      <Input label='Email' name='email' />

      <AppErrorBoundary>
        <CustomSelect
          id={'update-employee-select-department'}
          label='Department'
          name='departmentId'
          displayValueKey='title'
          trueValueKey='id'
          {...{
            setFieldValue,
            options: departments?.content ?? [],
          }}
          isLoading={gettingDepartments}
          isError={failedToGetDepartments}
        >
          {addDepartment && (
            <SecondaryActionButton
              onClick={() => addDepartment(values)}
              text={'Add Department'}
              className={'py-4'}
            />
          )}
        </CustomSelect>
      </AppErrorBoundary>

      <div className='relative mt-10 flex justify-end pb-8'>
        <SubmitButton
          submitting={processing}
          className='dark-button min-w-[200px]'
        >
          {currentEmployee ? 'Update' : 'Add'} Employee
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
