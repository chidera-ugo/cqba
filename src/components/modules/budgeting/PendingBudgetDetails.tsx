import { useQueryClient } from '@tanstack/react-query';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { BudgetCard } from 'components/modules/budgeting/BudgetCard';
import { useApproveOrRejectBudget } from 'hooks/api/budgeting/useApproveOrRejectBudget';
import { useGetBudgetById } from 'hooks/api/budgeting/useGetBudgetById';
import { useGetColorByChar } from 'hooks/common/useGetColorByChar';

interface Props {
  id: string;
  close: () => void;
}

export const PendingBudgetDetails = ({ id, close }: Props) => {
  const queryClient = useQueryClient();

  const { getColor } = useGetColorByChar();

  const { isLoading: gettingBudget, isError, data } = useGetBudgetById(id);

  const { mutate, isLoading } = useApproveOrRejectBudget(id, {
    onSuccess() {
      close();
      queryClient.invalidateQueries(['budgets']);
    },
  });

  if (gettingBudget) return <IsLoading />;

  if (isError) return <IsError description={'Failed to get budget details'} />;

  return (
    <>
      <FullScreenLoader show={isLoading} />

      <BudgetCard {...data} {...{ getColor }} showFullDetails />

      {data.status === 'open' && (
        <div className='mt-8 gap-3 640:flex'>
          <button
            onClick={() => mutate({ status: 'declined' })}
            className='dark-button block h-11 w-full text-sm 640:w-1/2'
          >
            Reject Budget
          </button>

          <button
            onClick={() => mutate({ status: 'approved' })}
            className='primary-button mt-3 block h-11 w-full text-sm 640:mt-0 640:w-1/2'
          >
            Approve Budget
          </button>
        </div>
      )}
    </>
  );
};
