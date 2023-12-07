import { SettingsLayout } from 'components/layouts/SettingsLayout';
import { PlanFeatures } from 'components/modules/settings/license/PlanFeatures';
import { SubscriptionHistory } from 'components/modules/settings/license/SubscriptionHistory';
import { SubscriptionSummary } from 'components/modules/settings/license/SubscriptionSummary';

export default function License() {
  return (
    <SettingsLayout title={'License'}>
      <SubscriptionSummary />

      <div className='mt-6 grid min-h-[500px] grid-cols-12 gap-5'>
        <div className={'card col-span-8'}>
          <PlanFeatures />
        </div>

        <div className='card col-span-4 px-5 py-3'>
          <p className={'my-auto text-sm font-light'}>Subscription History</p>

          <SubscriptionHistory />
        </div>
      </div>
    </SettingsLayout>
  );
}
