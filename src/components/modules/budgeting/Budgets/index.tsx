import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { BudgetsGrid } from 'components/modules/budgeting/Budgets/Grid';
import { NoBudgets } from 'components/modules/budgeting/Budgets/NoBudgets';
import { PendingBudgetDetails } from 'components/modules/budgeting/PendingBudgetDetails';
import { BudgetsTable } from 'components/tables/budgeting/BudgetsTable';
import { ProjectsTable } from 'components/tables/budgeting/ProjectsTable';
import { useAppContext } from 'context/AppContext';
import {
  IBudget,
  useGetAllBudgetsOrProjects,
} from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { TPagination } from 'hooks/client_api/hooks/useUrlManagedState';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RightModalWrapper } from 'components/modal/ModalWrapper';

interface Props {
  search: string;
  currentTab?: string;
  isApprovalsPage?: boolean;
  layout: string;
  createdByUser?: boolean;
}

export const Budgets = ({
  pagination,
  isApprovalsPage,
  setPagination,
  search,
  currentTab,
  layout,
  createdByUser,
}: Props & Partial<TPagination>) => {
  console.log(pagination);

  const { screenSize } = useAppContext().state;

  const [currentBudget, setCurrentBudget] = useState<IBudget | null>(null);

  const { push } = useRouter();

  const isProjectsList = currentTab === 'projects';

  const { isLoading, isError, data, isRefetching } = useGetAllBudgetsOrProjects(
    {
      page: search ? 1 : Number(pagination?.pageIndex ?? 0) + 1,
      limit: pagination?.pageSize,
      search,
      status: isProjectsList ? undefined : currentTab,
      createdByUser,
    },
    isProjectsList,
    {
      enabled: !!currentTab,
    }
  );

  useEffect(() => {
    if (!setPagination) return;

    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [search]);

  function closeModal() {
    setCurrentBudget(null);
  }

  return (
    <>
      <RightModalWrapper
        title={currentTab === 'pending' ? 'Pending Approval' : 'Pending Budget'}
        show={!!currentBudget && currentBudget.status !== 'approved'}
        closeModal={closeModal}
        closeOnClickOutside
      >
        {currentBudget && (
          <AppErrorBoundary>
            <PendingBudgetDetails id={currentBudget._id} close={closeModal} />
          </AppErrorBoundary>
        )}
      </RightModalWrapper>

      {data && !data?.docs?.length ? (
        <NoBudgets processing={isLoading || isRefetching} />
      ) : (
        <AppErrorBoundary>
          {layout == 'grid' || screenSize?.['mobile'] ? (
            <BudgetsGrid
              {...{
                data,
                isProjectsList,
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
            <>
              {isProjectsList ? (
                <ProjectsTable
                  onRowClick={(budget) => {
                    push(`/budgeting/projects/${budget?._id}`);
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
              ) : (
                <BudgetsTable
                  onRowClick={(budget) => {
                    push(
                      `${!isApprovalsPage ? 'budgeting' : 'approvals'}/${
                        budget?._id
                      }`
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
            </>
          )}
        </AppErrorBoundary>
      )}
    </>
  );
};
