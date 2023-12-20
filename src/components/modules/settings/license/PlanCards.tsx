import clsx from 'clsx';
import { PlanCard } from 'components/modules/settings/license/PlanCard';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';
import { SubscriptionPlan } from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';

interface Props {
  currentTab: string;
  choosePlan: (plan: SubscriptionPlan) => void;
  plans?: SubscriptionPlan[];
  className?: string;
  isEligibleForTrial?: boolean;
}

export const PlanCards = ({
  currentTab,
  choosePlan,
  isEligibleForTrial,
  plans,
  className,
}: Props) => {
  const { data, isLoading } = useGetActiveSubscription();

  return (
    <div className='grid grid-cols-12 gap-4'>
      {plans?.map((plan) => {
        const { name, description, _id, mostPopular, amount } = plan;
        const isMostPopular = mostPopular;

        return (
          <PlanCard
            className={clsx(
              'p-6 py-7',
              isMostPopular && 'bg-primary-main',
              className
            )}
            isEligibleForTrial={isEligibleForTrial}
            isActive={_id === data?.plan?._id}
            isMostPopular={isMostPopular}
            duration={currentTab}
            processing={isLoading}
            key={_id}
            planName={name}
            amount={amount.NGN}
            choosePlan={() => choosePlan(plan)}
            buttonClassname={
              !mostPopular && amount.NGN > 0
                ? 'dark-button'
                : 'secondary-button'
            }
            description={description}
          />
        );
      })}
    </div>
  );
};
