import { SimpleToast } from 'components/common/SimpleToast';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { SimplePlus } from 'components/svgs/others/Plus';
import {
  IBudget,
  useGetAllBudgets,
} from 'hooks/api/budgeting/useGetAllBudgets';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { PaginatedResponse } from 'types/Table';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { AllBudgetsCardView } from 'components/modules/budgeting/AllBudgetsCardView';
import { AllBudgetsTable } from 'components/tables/budgeting/AllBudgetsTable';
import { PendingBudgetDetails } from './PendingBudgetDetails';
import budget from '/public/mockups/budget.png';

interface Props {
  viewMode: ViewMode;
  search: string;
  status?: string;
  currentTab?: { name: string; value: string };
  createBudget: () => void;
}

export type BudgetListProps = {
  isLoading?: boolean;
  isRefetching?: boolean;
  emptyTableText: string;
  isError?: boolean;
  data: PaginatedResponse<IBudget> | undefined;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  onItemClick?: ((res: any) => void) | undefined;
  className?: string;
  title: string;
};

export type ViewMode = 'table' | 'cards';

export const AllBudgets = ({
  viewMode,
  currentTab,
  createBudget,
  status,
  ...props
}: Props) => {
  const [showPinModal, setShowPinModal] = useState(false);

  const { push } = useRouter();

  const [currentBudget, setCurrentBudget] = useState<IBudget | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: viewMode === 'cards' ? 9 : 10,
  });

  const {
    isLoading,
    isError,
    data: res,
    isRefetching,
  } = useGetAllBudgets({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    status,
  });

  useEffect(() => {
    if (!currentTab) return;

    if (!res) return setData(undefined);

    setData(res);
  }, [res, currentTab]);

  const [data, setData] = useState<PaginatedResponse<IBudget> | undefined>(res);

  function closeModal() {
    setShowPinModal(false);
    setCurrentBudget(null);
  }

  return (
    <>
      <RightModalWrapper
        title='Pending Budget'
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
            <PendingBudgetDetails id={currentBudget.id} close={closeModal} />
          </AppErrorBoundary>
        )}
      </RightModalWrapper>

      <AppErrorBoundary>
        <SimpleToast
          show={isLoading || isRefetching}
          className='left-0 top-32 1180:left-[122px]'
        >
          <div className='flex py-2'>
            <Spinner className='my-auto mr-1 h-4 text-white' />
            <span className='my-auto'>Fetching</span>
          </div>
        </SimpleToast>

        <AllBudgetsList
          {...props}
          title='budgets'
          emptyTableText='You have not received any requests yet.'
          {...{
            viewMode,
            onItemClick(res: IBudget) {
              if (res.status === 'declined') return null;

              if (res.status === 'approved')
                return push(`/budgeting/${res.id}`);

              setCurrentBudget(res);
            },
            data,
            isLoading,
            isError,
            createBudget,
            isRefetching,
            pagination,
            setPagination,
          }}
        />
      </AppErrorBoundary>
    </>
  );
};

export const AllBudgetsList = ({
  viewMode,
  createBudget,
  ...props
}: { viewMode: ViewMode } & BudgetListProps & {
    createBudget: () => void;
  }) => {
  if (props.data?.empty)
    return (
      <div className='min-h-[480px] grid-cols-10 overflow-hidden rounded-2xl bg-neutral-100 640:grid'>
        <div className='col-span-6 my-auto h-full p-7 640:p-12 1280:col-span-5'>
          <div className='y-center h-full'>
            <h4 className='text-2xl 640:text-4xl'>Create Budget</h4>

            <p className='mt-4 font-light leading-6 text-neutral-600'>
              Creating a budget is the first step to financial success. Define
              your spending limits and allocate resources strategically to
              achieve your business goals
            </p>

            <div className='flex'>
              <button
                onClick={createBudget}
                className='dark-button x-center mt-4 flex h-11 w-full rounded-full px-4 480:w-auto'
              >
                <span className='my-auto mr-2'>Create budget</span>
                <span className='my-auto'>
                  <SimplePlus />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className='relative col-span-4 640:pt-12 1280:col-span-5'>
          <div className='x-center bottom-0 -right-24 w-full 640:absolute 1280:right-0'>
            <Image
              src={budget}
              alt='card-mockup'
              className='mx-auto mt-auto min-w-[500px] max-w-[500px]'
            />
          </div>
        </div>
      </div>
    );

  if (viewMode === 'cards') return <AllBudgetsCardView {...props} />;

  return <AllBudgetsTable {...props} />;
};
