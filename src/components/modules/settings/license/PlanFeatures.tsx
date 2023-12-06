import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';

export const PlanFeatures = () => {
  const { isLoading, isError, data: _ } = useGetActiveSubscription();

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError className={'py-20'} />;

  return <></>;
};
