import { UserRole } from 'enums/employee_enum';
import { Formik } from 'formik';
import { useUpdateEmployee } from 'hooks/api/employees/useUpdateEmployee';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useQueryClientInvalidator } from 'hooks/app/useQueryClientInvalidator';
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
  const { invalidate } = useQueryClientInvalidator();

  const { isLoading, mutate } = useUpdateEmployee(currentEmployee?._id, {
    onSuccess() {
      invalidate('team');
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
