import { AppLayout } from 'components/layouts/AppLayout';
import { SettingsTabs } from 'components/modules/settings/SettingsTabs';
import { PropsWithChildren } from 'react';

interface Props {
  title?: string;
}

export const SettingsLayout = ({
  children,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <AppLayout childrenClassName={'mb-5 640:mb-7'} title={title ?? 'Settings'}>
      <SettingsTabs />

      <div className='app-container mt-2'>{children}</div>
    </AppLayout>
  );
};
