import clsx from 'clsx';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { Tabs } from 'components/commons/Tabs';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { ChoosePaymentMethod } from 'components/modules/subscriptions/ChoosePaymentMethod';
import { PlanCards } from 'components/modules/subscriptions/PlanCards';
import { ComparePlans } from 'components/modules/subscriptions/ComparePlans';
import { UserIconLg } from 'components/svgs/UserIcon';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import {
  SubscriptionPlan,
  useGetAllSubscriptionPlans,
} from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { useState } from 'react';

const tabs = [
  { name: 'Monthly', value: 'MONTHLY' },
  { name: 'Yearly (30% Off)', value: 'YEARLY' },
];

export const ChoosePlan = ({ minimal }: { minimal?: boolean }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]!);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  );

  const { data: organization } = useGetOrganizationInformation();
  const { isLoading, isError, data } = useGetAllSubscriptionPlans();

  if (isLoading) {
    if (minimal) return <IsLoading />;

    return <FullScreenLoader id={'choose_plan'} white show />;
  }

  if (isError)
    return (
      <IsError
        className={'py-20'}
        description={'An error occurred initializing dashboard'}
      />
    );

  return (
    <div className={clsx(!minimal && 'app-container mx-auto max-w-[1168px]')}>
      <ChoosePaymentMethod
        show={!!selectedPlan}
        months={currentTab.value == 'MONTHLY' ? 1 : 12}
        selectedPlan={selectedPlan}
        close={() => setSelectedPlan(null)}
      />

      <div>
        <div className={clsx(minimal ? 'mb-10' : 'py-10')}>
          {!minimal && (
            <>
              <div className='x-center'>
                <UserIconLg />
              </div>

              <p className='mt-2 text-center text-xl font-medium text-neutral-280'>
                {organization?.businessName}
              </p>
            </>
          )}

          <div
            className={clsx(
              minimal ? 'justify-between text-left 768:flex' : 'text-center'
            )}
          >
            <div>
              <h1
                className={clsx(
                  'text-neutral-280 640:max-w-full',
                  minimal
                    ? 'max-w-[320px] text-2xl leading-7'
                    : 'mt-8 text-3xl 640:mt-12 640:text-5xl'
                )}
              >
                Select Preferred Plan for your business
              </h1>

              <p
                className={clsx(
                  'font-light text-neutral-280',
                  minimal
                    ? 'mt-1 text-sm 640:text-base'
                    : 'mt-3 text-base 640:text-xl'
                )}
              >
                {minimal
                  ? 'Compare plans with ease, and choose the one that works for you.'
                  : 'No surprises, just fair and honest pricing. Compare plans with ease, and choose the one that works for you.'}
              </p>
            </div>

            <div
              className={clsx(
                minimal
                  ? 'mt-5 w-fit 768:mt-0'
                  : 'x-center mx-auto mt-10 w-fit',
                'flex-shrink-0'
              )}
            >
              <Tabs
                className={'rounded-full'}
                sliderClassname={'rounded-full'}
                tabClassname={'w-fit'}
                layoutId={'plan_type'}
                tabs={tabs}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
            </div>
          </div>
        </div>

        <PlanCards
          plans={data?.filter(({ amount }) => {
            if (minimal) return amount.NGN > 0;
            return true;
          })}
          className={clsx(
            minimal
              ? 'col-span-12 880:col-span-6'
              : 'col-span-12 640:col-span-6 1024:col-span-4'
          )}
          isEligibleForTrial={!minimal}
          choosePlan={(plan) => setSelectedPlan(plan)}
          currentTab={currentTab.value}
        />
      </div>

      <ComparePlans
        choosePlan={(planCode) => {
          const plan = data?.find(({ code }) => planCode === code);

          if (!plan) return;

          setSelectedPlan(plan);
        }}
        showOnlyPaidPlans={minimal}
        headerClassname={'mt-24'}
        centerText
      />
    </div>
  );
};
