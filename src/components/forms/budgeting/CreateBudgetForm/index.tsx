import { useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useCreateBudget } from 'hooks/api/budgeting/useCreateBudget';
import { Dispatch, SetStateAction } from 'react';
import { sanitizeAmount } from 'utils/formatters/formatAmount';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';
import { toast } from 'react-toastify';
import { AppToast } from 'components/primary/AppToast';

interface Props {
  close: () => void;
  createCategory: () => void;
  formRecoveryValues: Record<string, any> | null;
  setFormRecoveryValues: Dispatch<SetStateAction<Record<string, any> | null>>;
  addDepartment?: (values: Record<string, any>) => void;
}

export const CreateBudgetForm = ({
  close,
  createCategory,
  setFormRecoveryValues,
  formRecoveryValues,
  addDepartment,
}: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCreateBudget({
    onSuccess() {
      queryClient.invalidateQueries(['budgets']);

      toast(<AppToast>Created budget</AppToast>, {
        type: 'success',
      });

      close();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ amount, dueDate, ...values }) => {
        mutate({
          ...values,
          amount: sanitizeAmount({ value: amount, returnTrueAmount: true }),
          deadline: dueDate.value,
        });
      }}
    >
      {(formikProps) => {
        return (
          <Form
            createCategory={(values) => {
              setFormRecoveryValues(values);
              createCategory();
            }}
            {...{
              addDepartment,
              formRecoveryValues,
              formikProps,
              processing: isLoading,
            }}
          />
        );
      }}
    </Formik>
  );
};
