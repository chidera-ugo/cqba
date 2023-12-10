import { AppLayout } from 'components/layouts/AppLayout';
import { ChoosePlan } from 'components/modules/subscriptions/ChoosePlan';

export default function ChangePlan() {
  return (
    <AppLayout
      title={'Settings'}
      breadCrumbs={[
        {
          title: 'License',
          url: '/settings/license',
        },
        {
          title: 'Change Plan',
        },
      ]}
      enabledFor={'owner'}
    >
      <ChoosePlan minimal />
    </AppLayout>
  );
}
