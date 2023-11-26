import { useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useCreatePersonalBudget } from 'hooks/api/budgeting/useCreatePersonalBudget';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { sanitizeAmount } from 'utils/formatters/formatAmount';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';

export const CreateBudgetForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { primaryWallet } = useManageWallets();
  const queryClient = useQueryClient();

  const { mutate: createPersonalBudget, isLoading: creatingPersonalBudget } =
    useCreatePersonalBudget({
      onSuccess() {
        queryClient.invalidateQueries(['budgets']);
        queryClient.invalidateQueries(['wallets']);
        onSuccess();
      },
    });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({
        amount,
        expiryDate,
        title,
        allocation,
        description,
        expires,
        threshold,
      }) => {
        createPersonalBudget({
          name: title,
          description,
          currency: primaryWallet.currency,
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
            {...{
              formikProps,
              processing: creatingPersonalBudget,
            }}
          />
        );
      }}
    </Formik>
  );
};
