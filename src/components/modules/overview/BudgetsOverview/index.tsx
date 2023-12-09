import clsx from 'clsx';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { ActiveBudgetsOverview } from 'components/modules/overview/BudgetsOverview/ActiveBudgetsOverview';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const tabs = [
  { title: 'Active Budgets', value: 'active' },
  {
    title: 'Requests',
    value: 'pending',
  },
];

export const BudgetsOverview = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div className='card p-0'>
      <h5 className={'p-5 text-base font-medium'}>Budgets</h5>

      <div className='h-9 overflow-hidden rounded-full border border-neutral-200'>
        {tabs.map(({ value, title }, i) => {
          const isActive = currentTab?.value === value;
          const id = `budget_overview_${title}`;

          return (
            <button
              onClick={() => setCurrentTab({ value, title })}
              id={id}
              key={id}
              type='button'
              className={clsx(
                'relative h-full px-2 transition-none',
                i > 0 && 'border-l border-neutral-200'
              )}
            >
              <span
                className={clsx(
                  `y-center smooth relative z-10 h-full flex-shrink-0 px-1 text-xs font-medium 340:text-sm`,
                  isActive ? 'text-black' : 'text-neutral-500'
                )}
              >
                {title}
              </span>

              {isActive && (
                <motion.div
                  className='absolute inset-0 z-0 h-full w-full'
                  transition={{
                    duration: 0.3,
                  }}
                  layoutId={'budgets_type_tab'}
                >
                  <div className={clsx(`h-full w-full bg-[#F0F2F5]`)}></div>
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

      <div className='h-[400px]'>
        <AppErrorBoundary>
          {currentTab?.value === 'active' ? <ActiveBudgetsOverview /> : <></>}
        </AppErrorBoundary>
      </div>

      <Link href={`/budgets`} className='border-t border-neutral-200 p-4'>
        View Budgets
      </Link>
    </div>
  );
};
