import clsx from 'clsx';
import { NoData } from 'components/core/Table/NoData';
import { SelectBudgetToDebitForm } from 'components/forms/wallet/SelectBudgetToDebitForm';
import { MiniPlus } from 'components/svgs/forms/Plus';
import { EmptyChart } from 'components/svgs/overview/EmptyChart';
import { motion } from 'framer-motion';
import { useUserRole } from 'hooks/access_control/useUserRole';
import { IProject } from 'hooks/api/budgeting/project/useGetProjectById';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { UsePerformWalletToBank } from 'hooks/wallet/usePerformWalletToBank';

export const selectBudgetTabs = [
  {
    name: 'Single Budgets',
    value: 'budget',
  },
  {
    name: 'Projects',
    value: 'project',
  },
];

interface Props {
  projects?: IProject[];
  budgets?: IBudget[];
  createBudget: () => void;
}

export const SelectBudgetToDebit = ({
  currentTab,
  setCurrentTab,
  isProject,
  createBudget,
  projects,
  budgets,
  setSelectedBudget,
  setMode,
}: Props & UsePerformWalletToBank) => {
  const { isOwner } = useUserRole();

  return (
    <>
      <div className='mt-7 h-12 overflow-hidden rounded-xl bg-[#F9FAFB] p-1'>
        {selectBudgetTabs?.map(({ name, value }) => {
          const isActive = currentTab?.value === value;
          const id = `wallet_to_bank_type_${name}`;

          return (
            <button
              onClick={() => setCurrentTab({ value, name })}
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
                {name}
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

      {(isProject && !projects?.length) || (!isProject && !budgets?.length) ? (
        <>
          {isProject && !isOwner ? (
            <NoData
              noToast
              type='budget'
              icon={<EmptyChart />}
              subTitle={
                <span className={'mx-auto block max-w-[273px]'}>
                  You have not been assigned to any project. Allocated Projects
                  and budgets will appear here
                </span>
              }
            />
          ) : (
            <button
              onClick={createBudget}
              className={clsx(
                'dashed_card mt-8 w-full',
                'y-center bg-primary-50'
              )}
            >
              <span className={'mx-auto'}>
                <MiniPlus />
              </span>

              <h5
                className={clsx(
                  'text-center text-base font-medium text-primary-main',
                  'mx-auto mt-2'
                )}
              >
                Add Budget
              </h5>

              <p
                className={
                  'mx-auto mt-1 max-w-[250px] text-xs leading-5 text-neutral-600'
                }
              >
                No budgets have been added yet
              </p>
            </button>
          )}
        </>
      ) : (
        <SelectBudgetToDebitForm
          isProject={isProject}
          createBudget={createBudget}
          budgets={budgets}
          projects={projects}
          onSubmit={(budget) => {
            setSelectedBudget(budget);
            setMode('transfer');
          }}
        />
      )}
    </>
  );
};
