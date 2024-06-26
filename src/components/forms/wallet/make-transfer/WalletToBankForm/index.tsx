import { Transact } from 'components/modules/core/Transact';
import { WalletToBankFormRecoveryValues } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank';
import { Formik } from 'formik';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useHandleError } from 'hooks/api/useHandleError';
import { useInititateWalletToBank } from 'hooks/api/wallet/useInititateWalletToBank';
import { useQueryClientInvalidator } from 'hooks/app/useQueryClientInvalidator';
import { useTransact } from 'hooks/dashboard/core/useTransact';
import { useState } from 'react';
import { FormRecoveryProps } from 'types/forms/form_recovery';
import { getAmountInLowestUnit } from 'utils/formatters/formatAmount';
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

  const { mutate, isLoading } = useInititateWalletToBank(budgetId, {
    onError: () => null, // Overrides the default onError in useTMutation,
  });

  const transact = useTransact({
    transactionType: 'WALLET_TO_BANK',
  });

  const { invalidate, defaultInvalidator } = useQueryClientInvalidator();

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
              amount: getAmountInLowestUnit(amount),
              accountNumber,
              pin,
            },
            {
              onSuccess(res) {
                defaultInvalidator(['budget', formikProps.values.budget]);
                invalidate('balances', 'budgets');

                if (res.status !== 'pending') {
                  transact.setMode('failed');
                  transact.setErrorMessage(res.message);
                  return;
                }

                formikProps.resetForm();
                transact.setMode('success');
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
