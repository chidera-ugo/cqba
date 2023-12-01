import { useQueryClient } from '@tanstack/react-query';
import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { AddBudgetBeneficiariesForm } from 'components/forms/budgeting/AddBudgetBeneficiariesForm';
import { CreateBudgetForm } from 'components/forms/budgeting/CreateBudgetForm';
import { initialValues } from 'components/forms/budgeting/CreateBudgetForm/initialValues';
import { initialValues as _initialValues } from 'components/forms/budgeting/AddBudgetBeneficiariesForm/initialValues';
import { UpdateEmployeeForm } from 'components/forms/employees/UpdateEmployeeForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { AnimateLayout } from 'components/animations/AnimateLayout';
import { useAppContext } from 'context/AppContext';
import { BudgetStatus } from 'enums/Budget';
import {
  Beneficiary,
  useCreateBudget,
} from 'hooks/api/budgeting/useCreateBudget';
import { useHandleError } from 'hooks/api/useHandleError';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useState } from 'react';
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
    'create' | 'add_beneficiaries' | 'create_employee' | 'approve' | 'success'
  >('create');

  const { user } = useAppContext().state;

  const [budgetStatus, setBudgetStatus] = useState<BudgetStatus | null>(null);

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
    onError: () => null,
  });

  function closeModal() {
    if (mode === 'approve' || mode === 'create_employee')
      return setMode('add_beneficiaries');

    if (mode === 'add_beneficiaries') return setMode('create');

    close();
    resetFormRecoveryValues();
    setMode('create');
  }

  function resetFormRecoveryValues() {
    setCreateBudgetFormRecoveryValues(null);
    setAddBudgetBeneficiariesRecoveryValues(null);
  }

  function createBudget(pin: string, errorCb: () => void) {
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

      const count = Object.values(beneficiaries)?.filter((val) => val)?.length;

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

    mutate(
      {
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
      },
      {
        onSuccess(res) {
          setBudgetStatus(res.status);
          setMode('success');

          queryClient.invalidateQueries(['budgets']);
          queryClient.invalidateQueries(['wallets']);
          queryClient.invalidateQueries(['employees']);

          resetFormRecoveryValues();
        },
        onError(e) {
          handleError(e);
          errorCb();
        },
      }
    );
  }

  return (
    <>
      <AuthorizeActionWithPin
        mode={mode}
        show={show && (mode === 'success' || mode === 'approve')}
        close={closeModal}
        processing={creatingBudget}
        title={
          mode === 'approve'
            ? user?.role === 'owner'
              ? 'Approve Budget'
              : 'Submit Request'
            : ''
        }
        finish={() => {
          closeModal();
        }}
        successTitle={
          budgetStatus === 'active' ? 'Budget Approved' : 'Successful'
        }
        successMessage={
          budgetStatus === 'active'
            ? `Congratulations! Your budget has been Approved successfully`
            : 'Your budget request has been sent successfully'
        }
        actionMessage={'Approve'}
        submit={(pin, errorCb) => createBudget(pin, errorCb)}
      />

      <RightModalWrapper
        show={show}
        title={
          mode === 'create'
            ? 'Create Budget'
            : mode === 'add_beneficiaries'
            ? 'Add Beneficiaries'
            : mode === 'create_employee'
            ? 'Invite Employee'
            : ''
        }
        closeModal={closeModal}
        closeOnClickOutside
        childrenClassname='py-0'
      >
        <AnimateLayout changeTracker={mode} className={'px-4 640:px-8'}>
          {mode === 'approve' || mode === 'success' ? null : mode ===
            'create_employee' ? (
            <UpdateEmployeeForm
              onSuccess={() => {
                setMode('add_beneficiaries');
              }}
            />
          ) : mode === 'add_beneficiaries' ? (
            <AppErrorBoundary>
              <AddBudgetBeneficiariesForm
                currency={primaryWallet?.currency}
                inviteEmployee={(values) => {
                  setAddBudgetBeneficiariesRecoveryValues((prev) => ({
                    ...prev!,
                    ...values,
                  }));

                  setMode('create_employee');
                }}
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
    </>
  );
};
