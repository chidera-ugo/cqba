import { AppLayout } from 'components/layouts/AppLayout';
import { ChoosePlan } from 'components/modules/subscriptions/ChoosePlan';

export default function ChangePlan() {
  return (
    <AppLayout
      title={'Change Plan'}
      breadCrumbs={[
        {
          title: 'License',
          url: '/settings/license',
        },
        {
          title: 'Change Plan',
        },
      ]}
    >
      <ChoosePlan minimal />
    </AppLayout>
  );
}
