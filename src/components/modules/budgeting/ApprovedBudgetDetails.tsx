import { AnimateLayout } from 'components/animations/AnimateLayout';
import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { ActiveBudgetCard } from 'components/modules/budgeting/ActiveBudgetCard';
import {
  ManageSingleBudgetCreation,
  Mode,
} from 'components/modules/budgeting/ManageSingleBudgetCreation';
import { AppToast } from 'components/primary/AppToast';
import { WalletTransactionsTable } from 'components/tables/wallet/WalletTransactionsTable';
import { useCreateBudget } from 'hooks/api/budgeting/useCreateBudget';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useHandleError } from 'hooks/api/useHandleError';
import { useQueryClientInvalidator } from 'hooks/app/useQueryClientInvalidator';
import { useManageSingleBudgetCreation } from 'hooks/budgeting/useManageSingleBudgetCreation';
import { UseUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const ApprovedBudgetDetails = ({
  budget,
  range,
  setRange,
  search,
  pagination,
  setPagination,
  isApprovalsPage,
  setFilters,
  filters,
}: {
  budget: IBudget;
  isApprovalsPage?: boolean;
  search: string;
} & UseUrlManagedState) => {
  const { getColor } = useGetColorByChar();
  const [mode, setMode] = useState<Mode>(Mode.create);

  const {
    resetFormRecoveryValues: _,
    getBudget,
    ...manageSingleBudgetCreation
  } = useManageSingleBudgetCreation(budget);

  const { invalidate, defaultInvalidator } = useQueryClientInvalidator();
  const { handleError } = useHandleError();

  const { isLoading: creatingBudget, mutate } = useCreateBudget(budget?._id, {
    onError: () => null,
  });

  function closeModal() {
    if (mode === Mode.approve || mode === Mode.create_employee)
      return setMode(Mode.add_beneficiaries);

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
        onSuccess() {
          invalidate('budgets', 'balances', 'team');
          defaultInvalidator(['budget', budget?._id]);
          setMode(Mode.create);

          toast(<AppToast>Updated beneficiaries</AppToast>, {
            type: 'success',
          });
        },
        onError(e) {
          handleError(e);
          errorCb();
        },
      }
    );
  }

  return (
    <div>
      <AuthorizeActionWithPin
        show={mode > Mode.add_beneficiaries}
        showBackground
        close={() => closeModal()}
        modalTitle={'Approve Changes'}
        finish={() => closeModal()}
        processing={creatingBudget}
        authorizeButtonText={'Approve'}
        submit={(pin, errorCb) => {
          createBudget(pin, errorCb);
        }}
      />

      <RightModalWrapper
        show={mode > Mode.create && mode < Mode.approve}
        title={'Edit Beneficiaries'}
        childrenClassname='py-0'
        closeModal={closeModal}
      >
        <AnimateLayout changeTracker={mode} className={'px-4 640:px-8'}>
          <AppErrorBoundary>
            <ManageSingleBudgetCreation
              {...{ mode, setMode, budget }}
              {...manageSingleBudgetCreation}
            />
          </AppErrorBoundary>
        </AnimateLayout>
      </RightModalWrapper>

      <ActiveBudgetCard
        isApprovalsPage={isApprovalsPage}
        showActions
        editBeneficiaries={() => setMode(Mode.add_beneficiaries)}
        getColor={getColor}
        {...budget}
      />

      {budget.status !== 'closed' && (
        <div className='mt-5'>
          <WalletTransactionsTable
            search={search}
            budgetId={budget?._id}
            {...{
              filters,
              setFilters,
              pagination,
              setPagination,
              range,
              setRange,
            }}
          />
        </div>
      )}
    </div>
  );
};
