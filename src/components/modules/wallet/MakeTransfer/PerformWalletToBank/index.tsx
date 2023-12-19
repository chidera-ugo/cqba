import clsx from 'clsx';
import { initialValues } from 'components/forms/wallet/make-transfer/WalletToBankForm/initialValues';
import { SelectBudgetToDebitForm } from 'components/forms/wallet/SelectBudgetToDebitForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { WalletToBank } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank/WalletToBank';
import { AnimateLayout } from 'components/animations/AnimateLayout';
import { motion } from 'framer-motion';
import { IProject } from 'hooks/api/budgeting/project/useGetProjectById';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useEffect, useState } from 'react';

const tabs = [
  {
    name: 'Single Budgets',
    value: 'budget',
  },
  {
    name: 'Projects',
    value: 'project',
  },
];

export type WalletToBankFormRecoveryValues = typeof initialValues | null;

interface Props {
  close: () => void;
  show: boolean;
  budget?: IBudget;
  budgets?: IBudget[];
  projects?: IProject[];
  createBudget: () => void;
}

export const PerformWalletToBank = ({
  close,
  budgets,
  projects,
  budget,
  show,
  createBudget,
}: Props) => {
  const defaultMode = !!budget ? 'transfer' : 'select_budget';

  const [mode, setMode] = useState<'transfer' | 'select_budget'>(defaultMode);

  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const [_budget, setBudget] = useState<IBudget | null>(null);

  const [formRecoveryValues, setFormRecoveryValues] =
    useState<WalletToBankFormRecoveryValues>(null);

  useEffect(() => {
    if (!budgets?.length && !!projects?.length) setCurrentTab(tabs[1]);
    else setCurrentTab(tabs[0]);
  }, [budgets, projects]);

  function closeModal() {
    setFormRecoveryValues(null);
    setMode(defaultMode);
    setCurrentTab(tabs[0]);
    close();
  }

  const isProject = currentTab?.value === 'project';

  return (
    <>
      <RightModalWrapper
        show={show}
        title={
          mode === 'select_budget'
            ? 'Choose Payment Method'
            : mode === 'transfer'
            ? 'Make a transfer'
            : ''
        }
        closeModal={closeModal}
        childrenClassname={'p-0'}
      >
        <AnimateLayout changeTracker={mode} className={'px-4 640:px-8'}>
          {mode === 'select_budget' ? (
            <>
              <div className='mt-7 h-12 overflow-hidden rounded-xl bg-[#F9FAFB] p-1'>
                {tabs?.map(({ name, value }) => {
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

              <SelectBudgetToDebitForm
                isProject={isProject}
                createBudget={createBudget}
                budgets={budgets}
                projects={projects}
                onSubmit={(budget) => {
                  setBudget(budget);
                  setMode('transfer');
                }}
              />
            </>
          ) : mode === 'transfer' ? (
            <WalletToBank
              budget={!!budget ? budget : !!_budget ? _budget : undefined}
              close={closeModal}
              {...{
                formRecoveryValues,
                setFormRecoveryValues,
                createBudget,
              }}
            />
          ) : null}
        </AnimateLayout>
      </RightModalWrapper>
    </>
  );
};
