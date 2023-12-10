import { SettingsLayout } from 'components/layouts/SettingsLayout';
import { UserPermissions } from 'components/modules/settings/permissions/UserPermissions';

export default function UserPermissionsPage() {
  return (
    <SettingsLayout enabledFor={'owner'}>
      <UserPermissions />
    </SettingsLayout>
  );
}
