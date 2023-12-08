import { useQueryClient } from '@tanstack/react-query';
import { UserRole } from 'enums/employee_enum';
import { Formik } from 'formik';
import { useUpdateEmployee } from 'hooks/api/employees/useUpdateEmployee';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

interface Props {
  onSuccess: () => void;
  formRecoveryValues?: Record<string, any> | null;
  currentEmployee?: IEmployee | null;
  role?: UserRole;
}

export const UpdateEmployeeForm = ({
  onSuccess,
  role,
  currentEmployee,
  formRecoveryValues,
}: Props) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useUpdateEmployee(currentEmployee?._id, {
    onSuccess() {
      queryClient.invalidateQueries(['employees']);
      queryClient.invalidateQueries(['permission_group_users']);
      onSuccess();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ email, phoneNumber, role }) => {
        mutate({
          role: role.toLowerCase(),
          phone: phoneNumber,
          email: email.trim(),
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              role,
              formikProps,
              processing: isLoading,
              currentEmployee,
              formRecoveryValues,
            }}
          />
        );
      }}
    </Formik>
  );
};
