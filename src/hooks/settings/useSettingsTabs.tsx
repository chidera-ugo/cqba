import { UserRole } from 'enums/employee_enum';
import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export type SettingsTab = {
  name: string;
  url?: string;
  enabledFor?: UserRole;
  isRoot?: boolean;
};

export const useSettingsTabs = () => {
  const { pathname } = useRouter();

  function checkIsActive(query: string, isRoot?: boolean, url?: string) {
    if (isRoot && pathname === '/settings') return query;
    if (url && pathname.includes(url)) return query;
    if (pathname.includes(convertToUrlString(query))) return query;
    return null;
  }

  const settingsTabs: SettingsTab[] = [
    {
      name: 'Profile',
      isRoot: true,
    },
    {
      name: 'License',
      enabledFor: 'owner',
    },
    { name: 'User Permissions', enabledFor: 'owner' },
    {
      name: 'Security',
    },
  ];

  return {
    settingsTabs,
    checkIsActive,
  };
};
