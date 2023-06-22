import { useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useUpdateEmployee } from 'hooks/api/employees/useUpdateEmployee';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { IDepartment } from 'hooks/api/employees/useGetDepartments';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

interface Props {
  onSuccess: () => void;
  departments: IDepartment[];
  handleClickCreateDepartment: (values: Record<string, any>) => void;
  formRecoveryValues?: Record<string, any> | null;
  currentEmployee?: IEmployee | null;
}

export const UpdateEmployeeForm = ({
  onSuccess,
  departments,
  handleClickCreateDepartment,
  currentEmployee,
  formRecoveryValues,
}: Props) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useUpdateEmployee(currentEmployee?.id, {
    onSuccess() {
      queryClient.invalidateQueries(['employees']);
      onSuccess();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ departmentId, ...values }) => {
        mutate({
          ...values,
          departmentId,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              formikProps,
              processing: isLoading,
              departments,
              currentEmployee,
              formRecoveryValues,
              handleClickCreateDepartment,
            }}
          />
        );
      }}
    </Formik>
  );
};