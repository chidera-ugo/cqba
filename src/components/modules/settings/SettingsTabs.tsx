import clsx from 'clsx';
import { ChevronRight } from 'components/svgs/navigation/Chevrons';
import { useHorizontalScrollIntoView } from 'hooks/commons/useHorizontalScrollIntoView';
import { useSettingsTabs } from 'hooks/settings/useSettingsTabs';
import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export const SettingsTabs = () => {
  const { settingsTabs, checkIsActive } = useSettingsTabs();
  const { push } = useRouter();
  const { scrollIntoView } = useHorizontalScrollIntoView();

  return (
    <div className='app-container x-between nav_bar sticky left-0 top-14 z-[1000] -ml-2 overflow-x-auto 640:h-16 1024:top-20'>
      <div className='flex w-full min-w-max flex-shrink-0'>
        {settingsTabs.map(({ isRoot, url, name }, i) => {
          const _url = convertToUrlString(name);
          const isActive = !!checkIsActive(name, isRoot, url);
          const id = `settings_tab-${_url}`;

          return (
            <div key={name} className={'flex gap-1'}>
              <button
                id={id}
                type={'button'}
                className={clsx(
                  'my-auto flex-shrink-0 gap-3 px-2 py-2.5 text-center text-sm font-medium transition-colors',
                  isActive
                    ? 'text-primary-main'
                    : 'text-neutral-400 hover:text-black'
                )}
                onClick={() => {
                  push(isRoot ? '/settings' : `/settings/${url ?? _url}`).then(
                    () => scrollIntoView(id)
                  );
                }}
              >
                {name}
              </button>

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
