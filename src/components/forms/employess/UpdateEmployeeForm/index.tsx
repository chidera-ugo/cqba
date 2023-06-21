import { useQueryClient } from '@tanstack/react-query';
import UnsavedChangesPrompt from 'components/common/UnsavedChangesPrompt';
import { Formik } from 'formik';
import { useUpdateEmployee } from 'hooks/api/employees/useUpdateEmployee';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { IDepartment } from 'hooks/api/employees/useGetDepartments';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useState } from 'react';

interface Props {
  onSuccess: () => void;
  departments: IDepartment[];
  handleClickCreateDepartment: () => void;
  currentEmployee?: IEmployee | null;
}

export const UpdateEmployeeForm = ({
  onSuccess,
  departments,
  handleClickCreateDepartment,
  currentEmployee,
}: Props) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useUpdateEmployee(currentEmployee?.id, {
    onSuccess() {
      queryClient.invalidateQueries(['employees']);
      onSuccess();
    },
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ department, ...values }) => {
        setHasUnsavedChanges(false);

        mutate({
          ...values,
          departmentId: department,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <>
            <UnsavedChangesPrompt {...{ hasUnsavedChanges }} />

            <Form
              {...{
                formikProps,
                processing: isLoading,
                setHasUnsavedChanges,
                departments,
                currentEmployee,
                handleClickCreateDepartment,
              }}
            />
          </>
        );
      }}
    </Formik>
  );
};
