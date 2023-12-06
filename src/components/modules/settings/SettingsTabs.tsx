import clsx from 'clsx';
import { ChevronRight } from 'components/svgs/navigation/Chevrons';
import Link from 'next/link';
import { useSettingsTabs } from 'hooks/settings/useSettingsTabs';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export const SettingsTabs = () => {
  const { settingsTabs, checkIsActive } = useSettingsTabs();

  return (
    <div className='-ml-2 flex gap-1 overflow-x-auto'>
      {settingsTabs.map(({ isRoot, url, name }, i) => {
        const _url = convertToUrlString(name);
        const isActive = !!checkIsActive(name, isRoot, url);

        return (
          <div key={name} className={'flex gap-1'}>
            <Link
              href={isRoot ? '/settings' : `/settings/${url ?? _url}`}
              id={`settings_tab-${_url}`}
              className={clsx(
                'my-auto gap-3 px-2 py-2.5 text-center text-sm font-medium transition-colors',
                isActive
                  ? 'text-primary-main'
                  : 'text-neutral-400 hover:text-black'
              )}
            >
              {name}
            </Link>

            {i < settingsTabs.length - 1 && (
              <span className={'my-auto'}>
                <ChevronRight />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
