import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

export type Props = {
  tabs: WideTab[];
  currentTab?: string;
  setCurrentTab?: Dispatch<SetStateAction<string>>;
  action?: (tab: WideTab) => void;
  layoutId?: string;
  className?: string;
};

export type WideTab =
  | {
      title: string;
      icon?: JSX.Element;
      url?: string;
      value?: any;
      textColor?: string;
    }
  | string;

export const WideTabs = ({
  tabs,
  className,
  setCurrentTab,
  currentTab,
  layoutId,
  action,
}: Props) => {
  return (
    <div className={clsx('no-scrollbar h-full', className)}>
      <div
        className={clsx(
          `my-auto flex h-full w-max flex-shrink-0 gap-5 align-middle`
        )}
      >
        {tabs.map((tab) => {
          const isObject = typeof tab !== 'string';

          const isActive = isObject
            ? currentTab === tab.value
            : currentTab === tab;

          return (
            <button
              key={isObject ? tab.title : tab}
              onClick={() => {
                const newTab = isObject ? tab.value : tab;

                if (setCurrentTab) setCurrentTab(newTab);
                if (action) action(tab);
              }}
              className='relative flex h-full items-center gap-2 align-middle'
            >
              <span
                className={clsx(
                  `smooth relative z-10 mb-auto text-sm font-semibold capitalize`,
                  isActive ? 'text-primary-main' : 'text-black'
                )}
              >
                {isObject ? tab?.title : tab}
              </span>

              {isActive ? (
                <motion.div
                  className='absolute bottom-0 left-0 z-0 w-full transition-none'
                  {...{ layoutId }}
                >
                  <div
                    className={`h-[1px] w-full rounded-lg bg-primary-main transition-none`}
                  ></div>
                </motion.div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
