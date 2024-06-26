import clsx from 'clsx';
import UnsavedChangesPrompt from 'components/commons/UnsavedChangesPrompt';
import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import {
  CreateBudgetForm,
  CreateBudgetFormRecoveryValues,
} from 'components/forms/budgeting/CreateBudgetForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { AnimateLayout } from 'components/animations/AnimateLayout';
import { IssueWithSubscription } from 'components/modules/app/IssueWithSubscription';
import {
  SubBudgetListItem,
  SubBudgetsList,
} from 'components/modules/budgeting/ManageProjectCreation/SubBudgetsList';
import {
  ManageSingleBudgetCreation,
  Mode as BudgetCreationMode,
} from 'components/modules/budgeting/ManageSingleBudgetCreation';
import { MiniPlus } from 'components/svgs/forms/Plus';
import { useAppContext } from 'context/AppContext';
import { useCreateProject } from 'hooks/api/budgeting/project/useCreateProject';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useHandleError } from 'hooks/api/useHandleError';
import { useQueryClientInvalidator } from 'hooks/app/useQueryClientInvalidator';
import { useManageSingleBudgetCreation } from 'hooks/budgeting/useManageSingleBudgetCreation';
import { useSubscriptionFeatures } from 'hooks/dashboard/core/useSubscriptionFeatures';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  getAmountInLowestUnit,
  sanitizeAmount,
} from 'utils/formatters/formatAmount';
import { generateUUID } from 'utils/generators/generateUUID';

export enum Mode {
  'create',
  'sub_budgets_list',
  'add_sub_budget',
  'approve',
  'success',
}

interface Props {
  show: boolean;
  budget?: IBudget;
  onFinish?: () => void;
  isTransferFlow?: boolean;
  close: () => void;
}

export const ManageProjectCreation = ({
  show,
  close,
  budget,
  isTransferFlow,
  onFinish,
}: Props) => {
  const { replace, query, push, pathname } = useRouter();

  const { user } = useAppContext().state;

  const [mode, setMode] = useState<Mode>(Mode.create);
  const [budgetCreationMode, setBudgetCreationMode] =
    useState<BudgetCreationMode>(BudgetCreationMode.create);
  const [subBudgets, setSubBudgets] = useState<SubBudgetListItem[]>([]);
  const [createProjectFormRecoveryValues, setCreateProjectFormRecoveryValues] =
    useState<CreateBudgetFormRecoveryValues>(null);

  const features = useSubscriptionFeatures();

  const { handleError } = useHandleError();
  const { invalidate } = useQueryClientInvalidator();

  const {
    getBudget,
    resetFormRecoveryValues: resetBudgetCreationValues,
    ...manageSingleBudgetCreation
  } = useManageSingleBudgetCreation();

  const { isLoading: creatingProject, mutate } = useCreateProject({
    onError: () => null,
  });

  function closeModal() {
    if (mode === Mode.approve) return setMode(Mode.sub_budgets_list);

    if (mode === Mode.sub_budgets_list) return setMode(Mode.create);

    const { modal: _, ...q } = query;

    replace({
      pathname,
      query: q,
    }).then(resetOnClose);
  }

  function closeBudgetCreationModal() {
    if (
      budgetCreationMode === BudgetCreationMode.approve ||
      budgetCreationMode === BudgetCreationMode.create_employee
    ) {
      return setBudgetCreationMode(BudgetCreationMode.add_beneficiaries);
    }

    if (budgetCreationMode === BudgetCreationMode.add_beneficiaries)
      return setBudgetCreationMode(BudgetCreationMode.create);

    setMode(Mode.sub_budgets_list);
    resetBudgetCreationValues();
    setBudgetCreationMode(BudgetCreationMode.create);
  }

  function resetFormRecoveryValues() {
    setCreateProjectFormRecoveryValues(null);
    resetBudgetCreationValues();
  }

  function createProject(pin: string, errorCb: () => void) {
    if (!createProjectFormRecoveryValues) return;

    const { amount, expiryDate, title, allocation, expires, threshold } =
      createProjectFormRecoveryValues;

    mutate(
      {
        name: title,
        pin,
        budgets: subBudgets.map(({ id: _, ...budget }) => {
          return {
            ...budget,
            pin,
          };
        }),
        currency: manageSingleBudgetCreation.currency,
        amount:
          Number(sanitizeAmount({ value: amount, returnTrueAmount: true })) *
          100,
        threshold: getAmountInLowestUnit(!threshold ? amount : allocation),
        expiry: expires ? expiryDate.calendarValue : null,
      },
      {
        onSuccess() {
          setMode(Mode.success);

          invalidate('budgets', 'projects', 'balances', 'team');

          resetFormRecoveryValues();
        },
        onError(e) {
          handleError(e);
          errorCb();
        },
      }
    );
  }

  function resetOnClose() {
    close();
    resetFormRecoveryValues();
    setSubBudgets([]);
    setMode(Mode.create);
    setBudgetCreationMode(BudgetCreationMode.create);
  }

  const isOwner = user?.role === 'owner';

  const unallocatedFunds =
    Number(
      sanitizeAmount({
        value: createProjectFormRecoveryValues?.amount ?? '0',
        returnTrueAmount: true,
      })
    ) *
      100 -
    subBudgets.reduce((a, b) => a + b.amount, 0);

  const hasSubBudgets = subBudgets?.length;

  return (
    <>
      <AuthorizeActionWithPin
        hasResponse={mode === Mode.success}
        show={show && (mode === Mode.success || mode === Mode.approve)}
        close={() => {
          closeModal();
          if (onFinish && mode === Mode.success) onFinish();
        }}
        processing={creatingProject}
        modalTitle={mode === Mode.approve ? 'Approve Project' : ''}
        finish={() => {
          closeModal();
          if (onFinish) onFinish();
        }}
        responseTitle={'Project Created Successfully'}
        responseMessage={
          'You have successfully created a project budget, you can now spend from this budget'
        }
        authorizeButtonText={'Approve'}
        submit={(pin, errorCb) => createProject(pin, errorCb)}
      />

      <RightModalWrapper
        show={mode === Mode.add_sub_budget}
        title={
          budgetCreationMode === BudgetCreationMode.create
            ? 'Add Sub Budget'
            : budgetCreationMode === BudgetCreationMode.add_beneficiaries
            ? 'Add Beneficiaries'
            : budgetCreationMode === BudgetCreationMode.create_employee
            ? 'Invite People'
            : ''
        }
        closeModal={closeBudgetCreationModal}
        hideBackdrop
        childrenClassname='py-0'
      >
        <AnimateLayout
          changeTracker={budgetCreationMode}
          className={'px-4 640:px-8'}
        >
          <AppErrorBoundary>
            <ManageSingleBudgetCreation
              unallocatedFunds={unallocatedFunds}
              mode={budgetCreationMode}
              setMode={setBudgetCreationMode}
              {...manageSingleBudgetCreation}
              onAddBudgetBeneficiariesSubmit={(values) => {
                const newBudget = getBudget(values);

                if (!newBudget) return;

                setSubBudgets((prev) => {
                  return [
                    ...prev,
                    {
                      ...newBudget,
                      id: generateUUID(),
                    },
                  ];
                });

                setMode(Mode.sub_budgets_list);
                resetBudgetCreationValues();
                setBudgetCreationMode(BudgetCreationMode.create);
              }}
            />
          </AppErrorBoundary>
        </AnimateLayout>
      </RightModalWrapper>

      <RightModalWrapper
        show={show}
        title={
          mode === Mode.create
            ? features.canCreateProject
              ? 'Create Project'
              : ''
            : mode === Mode.sub_budgets_list
            ? 'Sub Budgets'
            : ''
        }
        {...{
          closeModal,
        }}
        childrenClassname='py-0'
      >
        <UnsavedChangesPrompt
          hideBackdrop
          actionToPerformAfterRoutingByUnsavedChangesPrompt={resetOnClose}
          hasUnsavedChanges={!!createProjectFormRecoveryValues?.title}
        />

        <AnimateLayout changeTracker={mode} className={'px-4 640:px-8'}>
          {mode === Mode.approve ||
          mode === Mode.success ||
          mode === Mode.add_sub_budget ? null : mode ===
            Mode.sub_budgets_list ? (
            <div className={'py-8'}>
              <SubBudgetsList
                currency={manageSingleBudgetCreation.currency}
                subBudgets={subBudgets}
              />

              {unallocatedFunds > 0 && (
                <button
                  onClick={() => setMode(Mode.add_sub_budget)}
                  className={clsx(
                    'dashed_card w-full',
                    hasSubBudgets ? 'x-center gap-2' : 'y-center bg-primary-50'
                  )}
                >
                  {!hasSubBudgets && (
                    <span className={'mx-auto'}>
                      <MiniPlus />
                    </span>
                  )}

                  <h5
                    className={clsx(
                      'text-center text-base font-medium text-primary-main',
                      !hasSubBudgets && 'mx-auto mt-2'
                    )}
                  >
                    Add Sub Budget
                  </h5>

                  {hasSubBudgets ? (
                    <span className={'my-auto'}>
                      <MiniPlus />
                    </span>
                  ) : null}

                  {!hasSubBudgets && (
                    <p
                      className={
                        'mx-auto mt-1 max-w-[250px] text-xs leading-5 text-neutral-600'
                      }
                    >
                      Further break down your project to better manage your
                      expenditure
                    </p>
                  )}
                </button>
              )}

              {isTransferFlow && !subBudgets.length ? null : (
                <div className='mt-6 flex'>
                  <button
                    onClick={() => {
                      setMode(Mode.approve);
                    }}
                    className={
                      !subBudgets.length ? 'secondary-button' : 'primary-button'
                    }
                  >
                    {!subBudgets.length ? 'Skip for now' : 'Approve Project'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <AppErrorBoundary>
              {features.canCreateProject ? (
                <CreateBudgetForm
                  {...{ budget }}
                  currency={manageSingleBudgetCreation.currency}
                  formRecoveryValues={createProjectFormRecoveryValues}
                  onSubmit={(values) => {
                    setCreateProjectFormRecoveryValues((prev) => ({
                      ...prev!,
                      ...values,
                    }));

                    setMode(Mode.sub_budgets_list);
                  }}
                  isOwner={isOwner}
                />
              ) : (
                <IssueWithSubscription
                  wrapperClassname={'mt-8'}
                  actionText={'Change plan'}
                  action={() => push('/settings/license?_t=change_plan')}
                  title={`Upgrade Your Plan to Access Project Budget Feature`}
                  subTitle='Create multiple budgets for a project for detailed financial tracking and management. Upgrade to Premium Plan to get started.'
                />
              )}
            </AppErrorBoundary>
          )}
        </AnimateLayout>
      </RightModalWrapper>
    </>
  );
};
