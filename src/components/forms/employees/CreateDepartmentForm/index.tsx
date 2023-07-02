import { useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useAddDepartment } from 'hooks/api/employees/useAddDepartment';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

interface Props {
  onSuccess: () => void;
}

export const CreateDepartmentForm = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useAddDepartment({
    onSuccess() {
      queryClient.invalidateQueries(['departments']);
      onSuccess();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ departmentName }) => {
        mutate({
          title: departmentName,
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
            }}
          />
        );
      }}
    </Formik>
  );
};
