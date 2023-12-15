import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { ActiveBudgetCard } from 'components/modules/budgeting/ActiveBudgetCard';
import { BudgetsGrid } from 'components/modules/budgeting/Budgets/Grid';
import { NoBudgets } from 'components/modules/budgeting/Budgets/NoBudgets';
import { ManageBudgetCreation } from 'components/modules/budgeting/ManageBudgetCreation';
import { SimplePlus } from 'components/svgs/others/Plus';
import { BudgetsTable } from 'components/tables/budgeting/BudgetsTable';
import { useAppContext } from 'context/AppContext';
import { IProject } from 'hooks/api/budgeting/project/useGetProjectById';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { convertUnpaginatedDataToPaginatedResponse } from 'utils/converters/convertUnpaginatedDataToPaginatedResponse';

interface Props {
  isLoading: boolean;
  isError: boolean;
  data?: IProject;
  layout: string;
  search: string;
  projectId: string;
  isRefetching: boolean;
}

export const ProjectDetails = ({
  isLoading,
  isRefetching,
  layout,
  isError,
  data,
  projectId,
}: Props) => {
  const { screenSize } = useAppContext().state;

  const [modal, setModal] = useState<
    'create_budget' | 'create_project' | 'choose_action' | null
  >(null);

  const { getColor } = useGetColorByChar();
  const { push } = useRouter();

  if (isLoading) return <IsLoading />;

  if (isError || !data)
    return <IsError description={'Failed to get project details'} />;

  const { budgets, ...project } = data;

  const paginatedBudgets = convertUnpaginatedDataToPaginatedResponse(budgets);

  return (
    <>
      <ManageBudgetCreation
        unallocatedFunds={data?.unallocatedAmount}
        show={modal === 'create_budget'}
        close={() => setModal(null)}
      />

      <ActiveBudgetCard
        showActions
        isProject
        getColor={getColor}
        actionsSlot={
          data?.unallocatedAmount > 0 ? (
            <button
              onClick={() => setModal('create_budget')}
              className='primary-button x-center my-auto h-6 w-6 gap-2 px-2 text-sm 640:h-10 640:w-full 640:px-4'
            >
              <span className={'my-auto'}>
                <SimplePlus />
              </span>
              <span className={'my-auto hidden 640:block'}>
                Create Sub Budget
              </span>
            </button>
          ) : null
        }
        {...(project as unknown as IBudget)}
      />

      <div className='mt-5'>
        {data && !budgets?.length ? (
          <NoBudgets processing={isLoading || isRefetching} />
        ) : (
          <AppErrorBoundary>
            {layout == 'grid' || screenSize?.['mobile'] ? (
              <BudgetsGrid
                onCardClick={(budget) => {
                  push(`/budgeting/projects/${projectId}/${budget?._id}`);
                }}
                data={paginatedBudgets}
                {...{
                  isError,
                  isLoading,
                }}
              />
            ) : (
              <BudgetsTable
                onRowClick={(budget) => {
                  push(`/budgeting/projects/${projectId}/${budget?._id}`);
                }}
                data={paginatedBudgets}
                {...{
                  isError,
                  isLoading,
                }}
              />
            )}
          </AppErrorBoundary>
        )}
      </div>
    </>
  );
};
