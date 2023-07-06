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
    <AppLayout title={title ?? 'Settings'}>
      <SettingsTabs />

      <div className='mt-4'>{children}</div>
    </AppLayout>
  );
};
