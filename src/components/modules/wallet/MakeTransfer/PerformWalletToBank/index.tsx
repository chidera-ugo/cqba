import { initialValues } from 'components/forms/wallet/make-transfer/WalletToBankForm/initialValues';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import {
  selectBudgetTabs,
  SelectBudgetToDebit,
} from 'components/modules/wallet/MakeTransfer/PerformWalletToBank/SelectBudgetToDebit';
import { WalletToBank } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank/WalletToBank';
import { AnimateLayout } from 'components/animations/AnimateLayout';
import { IProject } from 'hooks/api/budgeting/project/useGetProjectById';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { usePerformWalletToBank } from 'hooks/wallet/usePerformWalletToBank';
import { useEffect, useState } from 'react';

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
  const {
    mode,
    setMode,
    defaultMode,
    currentTab,
    setCurrentTab,
    selectedBudget,
    setSelectedBudget,
    isProject,
  } = usePerformWalletToBank();

  const [formRecoveryValues, setFormRecoveryValues] =
    useState<WalletToBankFormRecoveryValues>(null);

  useEffect(() => {
    if (!budgets?.length && !!projects?.length)
      setCurrentTab(selectBudgetTabs[1]);
    else setCurrentTab(selectBudgetTabs[0]);
  }, [budgets, projects]);

  function closeModal() {
    setFormRecoveryValues(null);
    setMode(defaultMode);
    setCurrentTab(selectBudgetTabs[0]);
    close();
  }

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
            <SelectBudgetToDebit
              {...{
                currentTab,
                budgets,
                projects,
                createBudget,
                mode,
                setMode,
                selectedBudget,
                defaultMode,
                setCurrentTab,
                setSelectedBudget,
                isProject,
              }}
            />
          ) : mode === 'transfer' ? (
            <WalletToBank
              budget={
                !!budget
                  ? budget
                  : !!selectedBudget
                  ? selectedBudget
                  : undefined
              }
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
