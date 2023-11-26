import { useQueryClient } from '@tanstack/react-query';
import { Transact } from 'components/modules/core/Transact';
import { Formik } from 'formik';
import { useHandleError } from 'hooks/api/useHandleError';
import { useInititateWalletToBank } from 'hooks/api/wallet/useInititateWalletToBank';
import { useTransact } from 'hooks/dashboard/core/useTransact';
import { Dispatch, SetStateAction, useState } from 'react';
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
  setFormRecoveryValues: Dispatch<SetStateAction<Record<string, any> | null>>;
  formRecoveryValues: Record<string, any> | null;
  createBudget: () => void;
  close: () => void;
}

export const WalletToBankForm = ({
  institutions,
  formRecoveryValues,
  setFormRecoveryValues,
  createBudget,
  close,
}: Props) => {
  const [budgetId, setBudgetId] = useState('');

  const queryClient = useQueryClient();

  const { mutate } = useInititateWalletToBank(budgetId, {
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
        // Todo: Handle validation errors, test with minimum amount

        return (
          <>
            <Transact
              authorize={(pin) => {
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
                      queryClient.invalidateQueries(['wallet_transactions']);
                    },
                    onError(e) {
                      handleError(e);
                      transact.setMode('authorize');
                    },
                  }
                );
              }}
              {...transact}
              finish={close}
            />

            <Form
              {...{
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
