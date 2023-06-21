import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { CustomSelect } from 'components/form-elements/CustomSelect';
import { Input } from 'components/form-elements/Input';
import { CreateDepartmentButton } from 'components/modules/employees/CreateDepartment';
import { Form as FormikForm, FormikProps } from 'formik';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { IDepartment } from 'hooks/api/employees/useGetDepartments';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  setHasUnsavedChanges: Dispatch<SetStateAction<boolean>>;
  departments: IDepartment[];
  handleClickCreateDepartment?: () => void;
  currentEmployee?: IEmployee | null;
}

export const Form = ({
  processing,
  formikProps,
  setHasUnsavedChanges,
  departments,
  handleClickCreateDepartment,
  currentEmployee,
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
    if (!currentEmployee) return;

    const { firstName, lastName, email, departmentId } =
      sanitizeRecordToRemoveUndefinedAndNulls(currentEmployee);

    setValues({
      ...values,
      firstName,
      lastName,
      email,
      department: departmentId,
    });
  }, [currentEmployee]);

  return (
    <FormikForm
      onChange={() => {
        setHasUnsavedChanges(true);
      }}
      onSubmit={handleSubmit}
    >
      <div className='gap-4 880:flex'>
        <Input autoFocus label='First Name' name='firstName' />
        <Input label='Last Name' name='lastName' />
      </div>

      <Input label='Email' name='email' />

      <AppErrorBoundary>
        <CustomSelect
          id={'select-department'}
          label='Department'
          name='department'
          displayValueKey='title'
          trueValueKey='id'
          {...{
            setFieldValue,
            options: departments,
          }}
        >
          <CreateDepartmentButton
            onClick={handleClickCreateDepartment}
            className={'py-4'}
          />
        </CustomSelect>
      </AppErrorBoundary>

      <div className='relative mt-10 flex justify-end pb-8'>
        <SubmitButton
          submitting={processing}
          className='dark-button min-w-[200px]'
        >
          Add Department
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
