import clsx from 'clsx';
import { IsEmpty } from 'components/data-states/IsEmpty';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import {
  SubscriptionStatus,
  useGetSubscriptionHistory,
} from 'hooks/api/subscriptions/useGetSubscriptionHistory';
import { formatDate } from 'utils/formatters/formatDate';

export const SubscriptionHistory = () => {
  const { isLoading, isError, data } = useGetSubscriptionHistory();

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError className={'py-20'} />;

  if (!data?.docs?.length)
    return <IsEmpty text={'No payments have been made'} />;

  return (
    <>
      {data?.docs?.map(({ _id, startedAt, plan, status }) => {
        return (
          <div key={_id} className={clsx('x-between')}>
            <div className={'my-1.5 block'}>
              <p className={'text-[15px] font-medium text-black line-clamp-1'}>
                {formatDate(startedAt, 'semi-full', true)}
              </p>
              <p className={'text-sm font-light text-neutral-500'}>
                {plan?.name} Plan
              </p>
            </div>

            <span
              className={clsx(
                'my-auto',
                status === SubscriptionStatus.Active
                  ? 'pill_green'
                  : status === SubscriptionStatus.Expired
                  ? 'pill_gray'
                  : 'pill_red'
              )}
            >
              {status}
            </span>
          </div>
        );
      })}
    </>
  );
};
