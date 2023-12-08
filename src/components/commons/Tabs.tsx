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
  sliderClassname?: string;
  tabClassname?: string;
};

export const Tabs = ({
  tabs,
  className,
  layoutId,
  currentTab,
  setCurrentTab,
  sliderClassname,
  tabClassname,
}: Props) => {
  return (
    <div
      className={clsx(
        className ?? 'rounded-lg',
        'hidden-scrollbar w-full overflow-x-auto bg-neutral-100'
      )}
    >
      <div className={`my-auto flex h-full w-full p-1 align-middle`}>
        {tabs.map((tab) => {
          const displayValue = tab.name;

          const isActive = tab['name'] === (currentTab as any)['name'];

          return (
            <button
              onClick={() => setCurrentTab(tab)}
              id={`tabs-${displayValue}`}
              key={displayValue}
              type='button'
              className={clsx(
                'relative h-9 px-3 transition-none',
                tabClassname ?? 'w-full'
              )}
            >
              <span
                className={clsx(
                  `y-center smooth relative z-10 h-full flex-shrink-0 text-xs font-medium 340:text-sm`,
                  isActive ? 'text-white' : 'text-neutral-500'
                )}
              >
                {displayValue}
              </span>

              {isActive && (
                <motion.div
                  className='absolute inset-0 z-0 h-9 w-full'
                  transition={{
                    duration: 0.1,
                  }}
                  layoutId={layoutId}
                >
                  <div
                    className={clsx(
                      `h-full w-full bg-black shadow-sm`,
                      sliderClassname ?? 'rounded-md'
                    )}
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
