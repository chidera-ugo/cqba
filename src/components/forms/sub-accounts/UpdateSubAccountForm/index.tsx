import { useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useUpdateSubAccount } from 'hooks/api/sub-accounts/useUpdateSubAccount';
import { ISubAccount } from 'hooks/api/sub-accounts/useGetAllSubAccounts';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

interface Props {
  onSuccess: () => void;
  addDepartment: () => void;
  addEmployee: () => void;
  currentSubAccount: ISubAccount | null;
}

export const UpdateSubAccountForm = ({
  onSuccess,
  currentSubAccount,
  ...props
}: Props) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useUpdateSubAccount(currentSubAccount?.id, {
    onSuccess() {
      queryClient.invalidateQueries(['sub-accounts']);
      onSuccess();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutate(values);
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              formikProps,
              processing: isLoading,
              currentSubAccount,
            }}
            {...props}
          />
        );
      }}
    </Formik>
  );
};
