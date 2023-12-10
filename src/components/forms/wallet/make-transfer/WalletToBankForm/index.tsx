import { useQueryClient } from '@tanstack/react-query';
import { Transact } from 'components/modules/core/Transact';
import { WalletToBankFormRecoveryValues } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank';
import { Formik } from 'formik';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useHandleError } from 'hooks/api/useHandleError';
import { useInititateWalletToBank } from 'hooks/api/wallet/useInititateWalletToBank';
import { useTransact } from 'hooks/dashboard/core/useTransact';
import { useState } from 'react';
import { FormRecoveryProps } from 'types/forms/form_recovery';
import { sanitizeAmount } from 'utils/formatters/formatAmount';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

export interface Institution {
  bankName: string;
  bankCode: string;
  type: string;
  id: string;
}

interface Props {
  institutions: Institution[];
  createBudget: () => void;
  close: () => void;
  currency: string;
  budget?: IBudget;
}

export const WalletToBankForm = ({
  institutions,
  createBudget,
  close,
  currency,
  formRecoveryValues,
  setFormRecoveryValues,
  budget,
}: Props & FormRecoveryProps<WalletToBankFormRecoveryValues>) => {
  const [budgetId, setBudgetId] = useState('');

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useInititateWalletToBank(budgetId, {
    onError: () => null, // Overrides the default onError in useTMutation,
  });

  const transact = useTransact({
    transactionType: 'WALLET_TO_BANK',
  });

  const { handleError } = useHandleError();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setBudgetId(values.budget);
        transact.setMode('authorize');
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        function authorize(pin: string, onError: () => void) {
          const { bank, amount, accountNumber } = formikProps?.values;

          mutate(
            {
              bankCode: bank,
              amount:
                parseInt(
                  sanitizeAmount({
                    value: amount,
                    returnTrueAmount: true,
                  })
                ) * 100,
              accountNumber,
              pin,
            },
            {
              onSuccess() {
                formikProps.resetForm();
                transact.setMode('success');
                queryClient.invalidateQueries(['wallets']);
                queryClient.invalidateQueries(['budgets']);
                queryClient.invalidateQueries([
                  'budget',
                  formikProps.values.budget,
                ]);
                queryClient.invalidateQueries(['cash_flow_chart']);
                queryClient.invalidateQueries(['wallet_transactions']);
              },
              onError(e) {
                handleError(e);
                transact.setMode('authorize');
                onError();
              },
            }
          );
        }

        return (
          <>
            <Transact
              authorize={(pin, onError) => authorize(pin, onError)}
              processing={isLoading}
              {...transact}
              finish={close}
            />

            <Form
              {...{
                budget,
                currency,
                formikProps,
                institutions,
                formRecoveryValues,
              }}
              createBudget={() => {
                setFormRecoveryValues(formikProps.values);
                createBudget();
              }}
            />
          </>
        );
      }}
    </Formik>
  );
};
