import { IsEmpty } from 'components/core/Table/TableDataStates';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { useGetSubscriptionHistory } from 'hooks/api/subscriptions/useGetSubscriptionHistory';

export const SubscriptionHistory = () => {
  const { isLoading, isError, data } = useGetSubscriptionHistory();

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError className={'py-20'} />;

  if (!data?.docs?.length)
    return <IsEmpty emptyTableText={'No payments have been made'} />;

  return <div className={'mt-4'}>hello</div>;
};
