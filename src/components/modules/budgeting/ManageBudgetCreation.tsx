import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { AnimateLayout } from 'components/animations/AnimateLayout';
import {
  ManageSingleBudgetCreation,
  Mode,
} from 'components/modules/budgeting/ManageSingleBudgetCreation';
import { useAppContext } from 'context/AppContext';
import { BudgetStatus } from 'enums/budget';
import { useCreateBudget } from 'hooks/api/budgeting/useCreateBudget';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useHandleError } from 'hooks/api/useHandleError';
import { useQueryInvalidator } from 'hooks/app/useQueryInvalidator';
import { useManageSingleBudgetCreation } from 'hooks/budgeting/useManageSingleBudgetCreation';
import { useState } from 'react';

interface Props {
  show: boolean;
  close: () => void;
  budget?: IBudget;
  onFinish?: () => void;
}

export const ManageBudgetCreation = ({
  show,
  close,
  budget,
  onFinish,
}: Props) => {
  const [mode, setMode] = useState<Mode>(Mode.create);

  const { user } = useAppContext().state;
  const isOwner = user?.role === 'owner';

  const [budgetStatus, setBudgetStatus] = useState<BudgetStatus | null>(null);

  const { getBudget, resetFormRecoveryValues, ...manageSingleBudgetCreation } =
    useManageSingleBudgetCreation();

  const { invalidate, defaultInvalidator } = useQueryInvalidator();
  const { handleError } = useHandleError();

  const { isLoading: creatingBudget, mutate } = useCreateBudget(budget?._id, {
    onError: () => null,
  });

  const isAuthorizationMode = mode === Mode.approve || mode === Mode.success;

  function closeModal() {
    if (mode === Mode.approve || mode === Mode.create_employee) {
      if (isOwner) return setMode(Mode.add_beneficiaries);
      else return setMode(Mode.create);
    }

    if (mode === Mode.add_beneficiaries) return setMode(Mode.create);

    close();
    resetFormRecoveryValues();
    setMode(Mode.create);
  }

  function createBudget(pin: string, errorCb: () => void) {
    const newBudget = getBudget(
      manageSingleBudgetCreation.addBudgetBeneficiariesFormRecoveryValues
    );

    if (!newBudget) return;

    mutate(
      {
        ...newBudget,
        pin,
      },
      {
        onSuccess(res) {
          setBudgetStatus(res.status);
          setMode(Mode.success);

          invalidate('budgets', 'balances', 'team');
          defaultInvalidator(['budget', budget?._id]);

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
        isSuccess={mode === Mode.success}
        show={show && isAuthorizationMode}
        close={closeModal}
        processing={creatingBudget}
        title={
          mode === Mode.approve
            ? user?.role === 'owner'
              ? 'Approve Budget'
              : 'Submit Request'
            : ''
        }
        finish={() => {
          closeModal();

          if (!onFinish) return;

          onFinish();
        }}
        successTitle={
          budgetStatus === 'active'
            ? `Budget ${isOwner ? 'Created' : 'Approve'}`
            : 'Successful'
        }
        successMessage={
          budgetStatus === 'active'
            ? `Congratulations! Your budget has been ${
                isOwner ? 'created' : 'approved'
              } successfully`
            : 'Your budget request has been sent successfully'
        }
        actionMessage={'Approve'}
        submit={(pin, errorCb) => createBudget(pin, errorCb)}
      />

      <RightModalWrapper
        show={show}
        title={
          mode === Mode.create
            ? 'Create Budget'
            : mode === Mode.add_beneficiaries
            ? 'Add Beneficiaries'
            : mode === Mode.create_employee
            ? 'Invite Employee'
            : ''
        }
        {...{
          closeModal,
        }}
        childrenClassname='py-0'
      >
        <AnimateLayout changeTracker={mode} className={'px-4 640:px-8'}>
          {isAuthorizationMode ? null : (
            <AppErrorBoundary>
              <ManageSingleBudgetCreation
                {...{ mode, setMode }}
                {...manageSingleBudgetCreation}
              />
            </AppErrorBoundary>
          )}
        </AnimateLayout>
      </RightModalWrapper>
    </>
  );
};
