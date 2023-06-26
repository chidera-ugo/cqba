import { SubAccountInformation } from 'components/modules/sub-accounts/SubAccountInformation';
import { AppLayout } from 'components/layouts/AppLayout';

export default function SubAccountDetails() {
  return (
    <AppLayout title='Sub Account Details' back={'/sub-accounts'}>
      <SubAccountInformation />
    </AppLayout>
  );
}
