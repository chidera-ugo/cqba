import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { BudgetsGrid } from 'components/modules/budgeting/Budgets/Grid';
import { NoBudgets } from 'components/modules/budgeting/Budgets/NoBudgets';
import { PendingBudgetDetails } from 'components/modules/budgeting/PendingBudgetDetails';
import { BudgetsTable } from 'components/tables/budgeting/BudgetsTable';
import { useAppContext } from 'context/AppContext';
import {
  IBudget,
  useGetAllBudgets,
} from 'hooks/api/budgeting/useGetAllBudgets';
import { TPagination } from 'hooks/client_api/hooks/useUrlManagedState';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RightModalWrapper } from 'components/modal/ModalWrapper';

interface Props {
  search: string;
  currentTab: string;
  isApprovalsPage?: boolean;
  layout: string;
}

export const Budgets = ({
  pagination,
  isApprovalsPage,
  setPagination,
  search,
  currentTab,
  layout,
}: Props & TPagination) => {
  const { screenSize } = useAppContext().state;

  const [showPinModal, setShowPinModal] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<IBudget | null>(null);

  const { push } = useRouter();

  const isProjectsList = currentTab === 'projects';

  const { isLoading, isError, data, isRefetching } = useGetAllBudgets(
    {
      page: search ? 1 : pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search,
      status: isProjectsList ? undefined : currentTab,
    },
    isProjectsList,
    {
      enabled: !!currentTab,
    }
  );

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [search]);

  function closeModal() {
    setShowPinModal(false);
    setCurrentBudget(null);
  }

  if (data && !data?.docs?.length)
    return <NoBudgets processing={isLoading || isRefetching} />;

  return (
    <>
      <RightModalWrapper
        title={currentTab === 'pending' ? 'Pending Approval' : 'Pending Budget'}
        show={
          !showPinModal &&
          !!currentBudget &&
          currentBudget.status !== 'approved'
        }
        closeModal={closeModal}
        closeOnClickOutside
      >
        {currentBudget && (
          <AppErrorBoundary>
            <PendingBudgetDetails id={currentBudget._id} close={closeModal} />
          </AppErrorBoundary>
        )}
      </RightModalWrapper>

      <AppErrorBoundary>
        {layout == 'grid' || screenSize?.['mobile'] ? (
          <BudgetsGrid
            {...{
              data,
              pagination,
              setPagination,
              setCurrentBudget,
              currentTab,
              isError,
              isRefetching,
              isLoading,
            }}
          />
        ) : (
          <BudgetsTable
            onRowClick={(budget) => {
              if (currentTab === 'pending') return setCurrentBudget(budget);

              push(
                `${!isApprovalsPage ? 'budgeting' : 'approvals'}/${budget?._id}`
              );
            }}
            {...{
              data,
              pagination,
              setPagination,
              setCurrentBudget,
              currentTab,
              isError,
              isRefetching,
              isLoading,
            }}
          />
        )}
      </AppErrorBoundary>
    </>
  );
};
