import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { AnimateLayout } from 'components/animations/AnimateLayout';
import { IssueWithSubscription } from 'components/modules/app/IssueWithSubscription';
import {
  ManageSingleBudgetCreation,
  Mode,
} from 'components/modules/budgeting/ManageSingleBudgetCreation';
import { BudgetStatus } from 'enums/budget';
import { useUserRole } from 'hooks/access_control/useUserRole';
import { useCreateBudget } from 'hooks/api/budgeting/useCreateBudget';
import { useCreateSubBudget } from 'hooks/api/budgeting/useCreateSubBudget';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useHandleError } from 'hooks/api/useHandleError';
import { useQueryClientInvalidator } from 'hooks/app/useQueryClientInvalidator';
import { useManageSingleBudgetCreation } from 'hooks/budgeting/useManageSingleBudgetCreation';
import { useSubscriptionFeatures } from 'hooks/dashboard/core/useSubscriptionFeatures';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {
  show: boolean;
  close: () => void;
  budget?: IBudget;
  onFinish?: () => void;
  projectId?: string;
  unallocatedFunds?: number;
  onSuccess?: (budgetId: string) => void;
}

export const ManageBudgetCreation = ({
  show,
  close,
  budget,
  unallocatedFunds,
  onFinish,
  projectId,
  onSuccess,
}: Props) => {
  const { push } = useRouter();

  const [mode, setMode] = useState<Mode>(Mode.create);
  const [budgetStatus, setBudgetStatus] = useState<BudgetStatus | null>(null);

  const { isOwner } = useUserRole();
  const features = useSubscriptionFeatures();

  const { getBudget, resetFormRecoveryValues, ...manageSingleBudgetCreation } =
    useManageSingleBudgetCreation();

  const { invalidate, defaultInvalidator } = useQueryClientInvalidator();
  const { handleError } = useHandleError();

  const { isLoading: creatingBudget, mutate } = useCreateBudget(budget?._id, {
    onError: () => null,
  });

  const { isLoading: creatingSubBudget, mutate: createSubBudget } =
    useCreateSubBudget(projectId, {
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

    function handleSuccess(res: IBudget) {
      setBudgetStatus(!!projectId ? 'active' : res?.status);

      if (onSuccess) {
        onSuccess(res?._id);
        close();
        resetFormRecoveryValues();
        setMode(Mode.create);
      } else setMode(Mode.success);

      invalidate('budgets', 'balances', 'team');

      if (!!projectId) invalidate('projects');

      defaultInvalidator(['budget', budget?._id]);

      resetFormRecoveryValues();
    }

    if (!!projectId)
      // Then it's sub-budget creation process
      return createSubBudget(
        {
          pin,
          budgets: [newBudget],
        },
        {
          onSuccess: handleSuccess,
          onError(e) {
            handleError(e);
            errorCb();
          },
        }
      );

    mutate(
      {
        ...newBudget,
        pin,
      },
      {
        onSuccess: handleSuccess,
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
        hasResponse={mode === Mode.success}
        show={show && isAuthorizationMode}
        showBackground
        close={() => {
          closeModal();
          if (onFinish && mode === Mode.success) onFinish();
        }}
        processing={creatingBudget || creatingSubBudget}
        modalTitle={
          mode === Mode.approve
            ? isOwner
              ? 'Approve Budget'
              : 'Submit Request'
            : ''
        }
        finish={() => {
          closeModal();
          if (onFinish) onFinish();
        }}
        responseTitle={
          budgetStatus === 'active'
            ? `Budget ${isOwner ? 'Created' : 'Approve'}`
            : 'Successful'
        }
        responseMessage={
          budgetStatus === 'active'
            ? `Congratulations! Your budget has been ${
                isOwner ? 'created' : 'approved'
              } successfully`
            : "Your budget request has been sent successfully. You can spend from it when it's approved"
        }
        authorizeButtonText={isOwner ? 'Approve' : 'Submit'}
        submit={(pin, errorCb) => {
          createBudget(pin, errorCb);
        }}
      />

      <RightModalWrapper
        show={show && !isAuthorizationMode}
        title={
          mode === Mode.create
            ? features.canCreateBudget
              ? 'Create Budget'
              : ''
            : mode === Mode.add_beneficiaries
            ? 'Add Beneficiaries'
            : mode === Mode.create_employee
            ? 'Invite People'
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
              {features.canCreateBudget ? (
                <ManageSingleBudgetCreation
                  {...{ mode, onSuccess, setMode, unallocatedFunds }}
                  {...manageSingleBudgetCreation}
                />
              ) : (
                <IssueWithSubscription
                  wrapperClassname={'mt-8'}
                  actionText={'Change plan'}
                  action={() => push('/settings/license?_t=change_plan')}
                  title={`Upgrade Your Plan to Increase Active Budgets`}
                  subTitle='Organization has reached its maximum limit for active budgets. To continue adding active budgets, kindly upgrading your plan'
                />
              )}
            </AppErrorBoundary>
          )}
        </AnimateLayout>
      </RightModalWrapper>
    </>
  );
};
