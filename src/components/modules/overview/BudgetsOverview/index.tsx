import clsx from 'clsx';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { PendingAndActiveBudgetsOverview } from 'components/modules/overview/BudgetsOverview/PendingAndActiveBudgetsOverview';
import { motion } from 'framer-motion';
import { useAppCounts } from 'hooks/budgeting/useAppCounts';
import Link from 'next/link';
import { useState } from 'react';

const tabs = [
  { title: 'Active Budgets', value: 'active' },
  {
    title: 'Requests',
    value: 'pending',
    countId: 'BUDGET_REQUESTS',
  },
];

export const BudgetsOverview = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const appCounts = useAppCounts();

  console.log(appCounts);

  return (
    <div className='card p-0'>
      <div className='h-[120px] p-5 pb-2'>
        <h5 className={'text-base font-medium'}>Budgets</h5>

        <div className='mt-4 h-12 overflow-hidden rounded-xl bg-[#F9FAFB] p-1'>
          {tabs.map(({ value, countId, title }) => {
            const isActive = currentTab?.value === value;
            const id = `budget_overview_${title}`;

            return (
              <button
                onClick={() => setCurrentTab({ value, title })}
                id={id}
                key={id}
                type='button'
                className={clsx('relative h-full w-1/2')}
              >
                <span
                  className={clsx(
                    `y-center smooth relative z-10 h-full flex-shrink-0 text-xs font-medium 340:text-sm`,
                    isActive ? 'text-primary-main' : 'text-neutral-500'
                  )}
                >
                  {title}
                  {!!countId && ` (${appCounts[countId]})`}
                </span>

                {isActive && (
                  <motion.div
                    className='absolute inset-0 z-0 h-full w-full'
                    transition={{
                      duration: 0.3,
                    }}
                    layoutId={'budgets_type_tab'}
                  >
                    <div
                      className={clsx(
                        `h-full w-full rounded-lg border border-neutral-200 bg-white shadow-sm`
                      )}
                    ></div>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={'block h-[420px] overflow-y-auto py-3 px-6'}>
        <AppErrorBoundary>
          <PendingAndActiveBudgetsOverview status={currentTab?.value} />
        </AppErrorBoundary>
      </div>

      <div className='x-center w-full border-t border-neutral-200 p-3'>
        <Link
          href={'/budgeting'}
          className={'w-full text-center text-sm font-medium text-primary-main'}
        >
          View Budgets
        </Link>
      </div>
    </div>
  );
};
