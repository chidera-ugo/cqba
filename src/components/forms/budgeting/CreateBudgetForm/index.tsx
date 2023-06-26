import { useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useCreateBudget } from 'hooks/api/budgeting/useCreateBudget';
import { sanitizeAmount } from 'utils/formatters/formatAmount';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';
import { toast } from 'react-toastify';
import { AppToast } from 'components/primary/AppToast';

interface Props {
  close: () => void;
}

export const CreateBudgetForm = ({ close }: Props) => {
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
          departmentId: '',
        });
      }}
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
