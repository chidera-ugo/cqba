import { selectBudgetTabs } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank/SelectBudgetToDebit';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useState } from 'react';

type Mode = 'transfer' | 'select_budget';

export const usePerformWalletToBank = (budget?: IBudget) => {
  const defaultMode: Mode = !!budget ? 'transfer' : 'select_budget';

  const [mode, setMode] = useState<Mode>(defaultMode);

  const [currentTab, setCurrentTab] = useState(selectBudgetTabs[0]);

  const [selectedBudget, setSelectedBudget] = useState<IBudget | null>(null);

  const isProject = currentTab?.value === 'project';

  return {
    mode,
    setMode,
    selectedBudget,
    setSelectedBudget,
    isProject,
    currentTab,
    setCurrentTab,
    defaultMode,
  };
};

export type UsePerformWalletToBank = ReturnType<typeof usePerformWalletToBank>;
