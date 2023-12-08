import clsx from 'clsx';
import { ChevronRight } from 'components/svgs/navigation/Chevrons';
import Link from 'next/link';
import { useSettingsTabs } from 'hooks/settings/useSettingsTabs';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export const SettingsTabs = () => {
  const { settingsTabs, checkIsActive } = useSettingsTabs();

  return (
    <div className='app-container x-between nav_bar sticky left-0 top-14 z-[1000] -ml-2 overflow-x-auto 640:h-16 1024:top-20'>
      <div className='flex w-full min-w-max flex-shrink-0'>
        {settingsTabs.map(({ isRoot, url, name }, i) => {
          const _url = convertToUrlString(name);
          const isActive = !!checkIsActive(name, isRoot, url);

          return (
            <div key={name} className={'flex gap-1'}>
              <Link
                href={isRoot ? '/settings' : `/settings/${url ?? _url}`}
                id={`settings_tab-${_url}`}
                className={clsx(
                  'my-auto flex-shrink-0 gap-3 px-2 py-2.5 text-center text-sm font-medium transition-colors',
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
    </div>
  );
};
