import { SettingsLayout } from 'components/layouts/SettingsLayout';
import { PlanFeatures } from 'components/modules/settings/license/PlanFeatures';
import { SubscriptionHistory } from 'components/modules/subscriptions/SubscriptionHistory';
import { SubscriptionSummary } from 'components/modules/subscriptions/SubscriptionSummary';

export default function License() {
  return (
    <SettingsLayout>
      <SubscriptionSummary />

      <div className='mt-6 min-h-[500px] grid-cols-12 gap-5 1180:grid'>
        <div className={'col-span-8'}>
          <PlanFeatures />
        </div>

        <div className={'col-span-4 mt-5 1180:mt-0'}>
          <div className='card overflow-hidden border-neutral-200 p-0'>
            <p
              className={
                'y-center my-auto h-14 bg-neutral-100 px-5 text-sm font-medium text-primary-main'
              }
            >
              Subscription History
            </p>

            <div
              className={
                'h-[320px] overflow-y-auto px-5 py-2 640:px-5 640:py-3'
              }
            >
              <SubscriptionHistory />
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
}
