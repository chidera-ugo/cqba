import { SetStateAction, Dispatch } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export type TabOption = { name: string; value: string };

type Props = {
  tabs: TabOption[];
  className?: string;
  currentTab: TabOption;
  setCurrentTab: Dispatch<SetStateAction<TabOption>>;
  layoutId?: string; // To track the tab animation
};

export const Tabs = ({
  tabs,
  className,
  layoutId,
  currentTab,
  setCurrentTab,
}: Props) => {
  return (
    <div
      className={clsx(
        className,
        'hidden-scrollbar w-full overflow-x-auto rounded-lg border border-neutral-300 bg-white'
      )}
    >
      <div className={`my-auto flex h-full w-full p-[1px] align-middle`}>
        {tabs.map((tab) => {
          const isString = typeof tab === 'string';
          const displayValue = isString ? tab : tab.name;

          const isActive = isString
            ? tab === currentTab
            : tab['name'] === (currentTab as any)['name'];

          return (
            <button
              onClick={() => {
                setCurrentTab(tab);
              }}
              id={`tabs-${displayValue}`}
              key={displayValue}
              type='button'
              className='relative w-full transition-none'
            >
              <span
                className={clsx(
                  `y-center smooth relative z-10 h-full flex-shrink-0 text-xs font-semibold 340:text-sm`,
                  isActive ? 'text-white' : 'text-neutral-700'
                )}
              >
                {displayValue}
              </span>

              {isActive && (
                <motion.div
                  className='absolute inset-0 z-0 h-full w-full'
                  layoutId={layoutId}
                >
                  <div
                    className={`h-full w-full rounded-md bg-black shadow-sm`}
                  ></div>
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
