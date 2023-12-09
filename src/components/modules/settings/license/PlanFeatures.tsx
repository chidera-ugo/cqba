import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { ComparePlansTable } from 'components/modules/subscriptions/ComparePlans/ComparePlansTable';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';
import { useGetAllSubscriptionPlans } from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';

export const PlanFeatures = () => {
  const { isLoading, isError, data } = useGetActiveSubscription();
  const {
    isLoading: gettingAllSubscriptions,
    isError: failedToGetAllSubscriptions,
  } = useGetAllSubscriptionPlans();

  if (isLoading || gettingAllSubscriptions)
    return (
      <div className={'card min-h-[600px]'}>
        <IsLoading />
      </div>
    );

  if (isError || failedToGetAllSubscriptions)
    return (
      <div className={'card min-h-[600px]'}>
        <IsError className={'py-20'} />
      </div>
    );

  return <ComparePlansTable planId={data?.plan?._id} />;
};
