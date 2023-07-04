import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { CustomSelect } from 'components/form-elements/CustomSelect';
import { SecondaryActionButton } from 'components/form-elements/CustomSelect/SecondaryActionButton';
import { Form as FormikForm, FormikProps } from 'formik';
import { useGetAllEmployees } from 'hooks/api/employees/useGetAllEmployees';
import { useGetAllDepartments } from 'hooks/api/departments/useGetAllDepartments';
import { ISubAccount } from 'hooks/api/sub-accounts/useGetAllSubAccounts';
import { useEffect } from 'react';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  addDepartment: () => void;
  addEmployee: () => void;
  processing: boolean;
  currentSubAccount: ISubAccount | null;
}

export const Form = ({
  processing,
  formikProps,
  addDepartment,
  addEmployee,
  currentSubAccount,
}: Props) => {
  const { handleSubmit, values, setFieldValue } = formikProps;

  const {
    isLoading: gettingDepartments,
    isError: failedToGetDepartments,
    data: departments,
  } = useGetAllDepartments();

  const {
    isLoading: gettingEmployees,
    isError: failedToGetEmployees,
    data: employees,
  } = useGetAllEmployees({
    page: 0,
    size: 20,
    departmentId: values.departmentId,
  });

  useEffect(() => {
    if (!currentSubAccount || !departments) return;

    const { departmentId } =
      sanitizeRecordToRemoveUndefinedAndNulls(currentSubAccount);

    setFieldValue('departmentId', departmentId);
  }, [currentSubAccount, employees, departments]);

  useEffect(() => {
    if (!currentSubAccount || !employees || !values.departmentId) return;

    const { employeeId } =
      sanitizeRecordToRemoveUndefinedAndNulls(currentSubAccount);

    setFieldValue('employeeId', employeeId);
  }, [currentSubAccount, employees, values.departmentId]);

  return (
    <FormikForm onSubmit={handleSubmit}>
      <AppErrorBoundary>
        <CustomSelect
          id={'select-department'}
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
          <SecondaryActionButton
            onClick={addDepartment}
            text={'Add Department'}
            className={'py-4'}
          />
        </CustomSelect>
      </AppErrorBoundary>

      {values.departmentId && (
        <AppErrorBoundary>
          <CustomSelect
            id={'select-employee'}
            label='Employee'
            name='employeeId'
            displayValueKey='name'
            trueValueKey='id'
            {...{
              setFieldValue,
              options:
                employees?.content.map(({ id, firstName, lastName }) => ({
                  id,
                  name: `${firstName} ${lastName}`,
                })) ?? [],
            }}
            isLoading={gettingEmployees}
            isError={failedToGetEmployees}
          >
            <SecondaryActionButton
              onClick={addEmployee}
              text={'Add Employee'}
              className={'py-4'}
            />
          </CustomSelect>
        </AppErrorBoundary>
      )}

      <div className='relative mt-10 flex justify-end pb-8'>
        <SubmitButton
          submitting={processing}
          className='dark-button min-w-[200px]'
        >
          {currentSubAccount ? 'Update' : 'Create'} Sub Account
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
