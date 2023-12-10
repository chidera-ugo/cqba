import { AppLayout } from 'components/layouts/AppLayout';
import { PermissionsGroupDetails } from 'components/modules/settings/permissions/PermissionsGroupDetails';

export default function PermissionsGroupDetailsPage() {
  return (
    <AppLayout
      title={'Settings'}
      breadCrumbs={[
        {
          title: 'User Permissions',
          url: '/settings/user-permissions',
        },
        {
          title: 'Permission Details',
        },
      ]}
      enabledFor={'owner'}
    >
      <PermissionsGroupDetails />
    </AppLayout>
  );
}
