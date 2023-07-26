import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export type SettingsTab = {
  name: string;
  url?: string;
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

  const _settingsTabs = [
    {
      name: 'Profile',
      isRoot: true,
    },
    'License',
    'Security',
  ];

  const settingsTabs: SettingsTab[] = _settingsTabs.map((tab) => {
    if (typeof tab === 'string') {
      return {
        name: tab,
      };
    }

    return tab;
  });

  return {
    settingsTabs,
    checkIsActive,
  };
};
