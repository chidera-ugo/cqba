import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { useGetBudgetById } from 'hooks/api/budgeting/useGetBudgetById';
import { useQueryValidator } from 'hooks/common/useQueryValidator';
import { useRouter } from 'next/router';

export const ApprovedBudgetDetails = () => {
  const { getValidQuery } = useQueryValidator();

  const { replace } = useRouter();

  const id = getValidQuery('budgetId');

  const { isLoading, isError, data } = useGetBudgetById(id);

  if (isLoading) return <IsLoading />;

  if (isError) return <IsError description={'Failed to get budget details'} />;

  if (data?.status !== 'approved')
    return (
      <SimpleInformation
        title={'Oops'}
        description={
          <span className='mt-2 block'>
            This budget has not been approved yet
          </span>
        }
        actionButton={{
          action: () => replace('/budgeting'),
          text: 'Go Back',
        }}
      />
    );

  return <>{id}</>;
};
