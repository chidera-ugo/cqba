import { useQueryClient } from '@tanstack/react-query';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { CodeInput } from 'components/form-elements/CodeInput';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { AddBudgetBeneficiariesForm } from 'components/forms/budgeting/AddBudgetBeneficiariesForm';
import { CreateBudgetForm } from 'components/forms/budgeting/CreateBudgetForm';
import { initialValues } from 'components/forms/budgeting/CreateBudgetForm/initialValues';
import { initialValues as _initialValues } from 'components/forms/budgeting/AddBudgetBeneficiariesForm/initialValues';
import { GreenCheck } from 'components/illustrations/Success';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { AppToast } from 'components/primary/AppToast';
import { AnimateLayout } from 'components/transition/AnimateLayout';
import {
  Beneficiary,
  useCreateBudget,
} from 'hooks/api/budgeting/useCreateBudget';
import { useHandleError } from 'hooks/api/useHandleError';
import { useResetter } from 'hooks/commons/useResetter';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FormRecoveryProps } from 'types/forms/form_recovery';
import { sanitizeAmount } from 'utils/formatters/formatAmount';

export const ManageBudgetCreation = ({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) => {
  const [mode, setMode] = useState<
    'create' | 'add_beneficiaries' | 'approve' | 'success'
  >('create');

  const [pin, setPin] = useState('');
  const [clearCodeInput, setClearCodeInput] = useResetter();

  const [createBudgetFormRecoveryValues, setCreateBudgetFormRecoveryValues] =
    useState<FormRecoveryProps<typeof initialValues>['formRecoveryValues']>(
      null
    );

  const [
    addBudgetBeneficiariesFormRecoveryValues,
    setAddBudgetBeneficiariesRecoveryValues,
  ] =
    useState<FormRecoveryProps<typeof _initialValues>['formRecoveryValues']>(
      null
    );

  const { primaryWallet, isError, isLoading } = useManageWallets();

  const queryClient = useQueryClient();
  const { handleError } = useHandleError();

  const { isLoading: creatingBudget, mutate } = useCreateBudget({
    onSuccess() {
      setMode('success');

      queryClient.invalidateQueries(['budgets']);
      queryClient.invalidateQueries(['wallets']);
      queryClient.invalidateQueries(['employees']);

      setCreateBudgetFormRecoveryValues(null);
      setAddBudgetBeneficiariesRecoveryValues(null);
      setPin('');
    },
    onError(e) {
      handleError(e);
      setClearCodeInput(true);
    },
  });

  function closeModal() {
    if (mode === 'approve') return setMode('add_beneficiaries');
    if (mode === 'add_beneficiaries') return setMode('create');

    close();
  }

  function createBudget() {
    if (
      !createBudgetFormRecoveryValues ||
      !addBudgetBeneficiariesFormRecoveryValues
    )
      return;

    const {
      amount,
      expiryDate,
      title,
      allocation,
      description,
      expires,
      threshold,
    } = createBudgetFormRecoveryValues;

    const { splittingRules, beneficiaries, allocations, budgetAmount } =
      addBudgetBeneficiariesFormRecoveryValues;

    function getBeneficiaries() {
      const arr: Beneficiary[] = [];

      const count = Object.values(beneficiaries)?.filter(
        (val) => !!val
      )?.length;

      const _budgetAmount = Number(
        sanitizeAmount({ value: budgetAmount, returnTrueAmount: true })
      );

      for (const i in beneficiaries) {
        if (beneficiaries[i])
          arr.push({
            user: i,
            allocation:
              (!splittingRules
                ? _budgetAmount / count
                : count === 1
                ? _budgetAmount
                : Number(
                    sanitizeAmount({
                      value: allocations[i]!,
                      returnTrueAmount: true,
                    })
                  )) * 100,
          });
      }

      return arr;
    }

    mutate({
      name: title,
      description,
      pin,
      beneficiaries: getBeneficiaries(),
      currency: primaryWallet?.currency,
      amount:
        parseInt(sanitizeAmount({ value: amount, returnTrueAmount: true })) *
        100,
      threshold:
        parseInt(
          sanitizeAmount({
            value: !threshold ? amount : allocation,
            returnTrueAmount: true,
          })
        ) * 100,
      expiry: expires ? expiryDate.calendarValue : null,
    });
  }

  return (
    <RightModalWrapper
      show={show}
      title={
        mode === 'create'
          ? 'Create Budget'
          : mode === 'add_beneficiaries'
          ? 'Add Beneficiaries'
          : mode === 'approve'
          ? 'Approve Budget'
          : ''
      }
      closeModal={closeModal}
      closeOnClickOutside
      childrenClassname='py-0'
    >
      <AnimateLayout
        changeTracker={mode}
        className={'flex flex-col px-4 640:px-8'}
      >
        {mode === 'success' ? (
          <div className='y-center py-20'>
            <SimpleInformation
              title={<span className='text-xl'>Budget Approved</span>}
              description={
                <div className='mx-auto mt-1 max-w-[325px]'>
                  Congratulations! Your budget has been Approved successfully
                </div>
              }
              icon={<GreenCheck />}
              actionButton={{
                text: 'Thanks chief',
                action() {
                  closeModal();
                },
              }}
            />
          </div>
        ) : mode === 'approve' ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (pin.length !== 4)
                return toast(<AppToast>Please provide a valid PIN</AppToast>, {
                  type: 'error',
                });

              createBudget();
            }}
            className={'py-10'}
          >
            <CodeInput
              charLimit={4}
              autoComplete='off'
              label='Transaction Pin'
              autoFocus
              type={'password'}
              submit={(code) => setPin(code)}
              name='code'
              clear={clearCodeInput}
              className='h-[54px] 768:h-[68px]'
            />

            <div className='mt-4'>
              <SubmitButton
                submitting={creatingBudget}
                disabled={pin.length !== 4}
                className='primary-button mt-4 w-[128px]'
              >
                Approve
              </SubmitButton>
            </div>
          </form>
        ) : mode === 'add_beneficiaries' ? (
          <AppErrorBoundary>
            <AddBudgetBeneficiariesForm
              currency={primaryWallet?.currency}
              formRecoveryValues={addBudgetBeneficiariesFormRecoveryValues}
              onSubmit={(values) => {
                setAddBudgetBeneficiariesRecoveryValues((prev) => ({
                  ...prev!,
                  ...values,
                }));

                setMode('approve');
              }}
            />
          </AppErrorBoundary>
        ) : (
          <AppErrorBoundary>
            {isLoading ? (
              <IsLoading />
            ) : isError ? (
              <IsError description={'Failed to initate budget creation'} />
            ) : (
              <CreateBudgetForm
                currency={primaryWallet?.currency}
                formRecoveryValues={createBudgetFormRecoveryValues}
                onSubmit={(values) => {
                  setCreateBudgetFormRecoveryValues((prev) => ({
                    ...prev!,
                    ...values,
                  }));

                  setAddBudgetBeneficiariesRecoveryValues((prev) => ({
                    ...prev!,
                    budgetAmount: values!.amount,
                  }));

                  setMode('add_beneficiaries');
                }}
              />
            )}
          </AppErrorBoundary>
        )}
      </AnimateLayout>
    </RightModalWrapper>
  );
};
