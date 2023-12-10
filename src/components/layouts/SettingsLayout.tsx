import { AppLayout } from 'components/layouts/AppLayout';
import { SettingsTabs } from 'components/modules/settings/SettingsTabs';
import { UserRole } from 'enums/employee_enum';
import { PropsWithChildren } from 'react';

interface Props {
  title?: string;
  enabledFor?: UserRole;
}

export const SettingsLayout = ({
  children,
  title,
  enabledFor,
}: PropsWithChildren<Props>) => {
  return (
    <AppLayout
      enabledFor={enabledFor}
      childrenClassName={'mb-5 640:mb-7'}
      title={title ?? 'Settings'}
    >
      <SettingsTabs />

      <div className='app-container mt-2'>{children}</div>
    </AppLayout>
  );
};
