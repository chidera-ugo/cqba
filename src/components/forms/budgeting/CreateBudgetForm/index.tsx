import { useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useCreatePersonalBudget } from 'hooks/api/budgeting/useCreatePersonalBudget';
import { FormRecoveryProps } from 'types/forms/form_recovery';
import { sanitizeAmount } from 'utils/formatters/formatAmount';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';

export type CreateBudgetFormRecoveryValues = FormRecoveryProps<
  typeof initialValues
>['formRecoveryValues'];

interface Props {
  onSuccess?: (budgetId: string) => void;
  onSubmit?: (values: CreateBudgetFormRecoveryValues) => void;
  formRecoveryValues?: CreateBudgetFormRecoveryValues;
  currency: string;
}

export const CreateBudgetForm = ({
  onSuccess,
  onSubmit,
  formRecoveryValues,
  currency,
}: Props) => {
  const queryClient = useQueryClient();

  const { mutate: createPersonalBudget, isLoading: creatingPersonalBudget } =
    useCreatePersonalBudget({
      onSuccess(res) {
        queryClient.invalidateQueries(['budgets']);
        queryClient.invalidateQueries(['wallets']);

        if (!onSuccess) return;

        onSuccess(res._id);
      },
    });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (onSubmit) return onSubmit(values);

        const {
          amount,
          expiryDate,
          title,
          allocation,
          description,
          expires,
          threshold,
        } = values;

        createPersonalBudget({
          name: title,
          description,
          currency,
          amount:
            parseInt(
              sanitizeAmount({ value: amount, returnTrueAmount: true })
            ) * 100,
          threshold:
            parseInt(
              sanitizeAmount({
                value: !threshold ? amount : allocation,
                returnTrueAmount: true,
              })
            ) * 100,
          expiry: expires ? expiryDate.calendarValue : null,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            recoveryValues={formRecoveryValues}
            {...{
              currency,
              formikProps,
              processing: creatingPersonalBudget,
            }}
          />
        );
      }}
    </Formik>
  );
};
