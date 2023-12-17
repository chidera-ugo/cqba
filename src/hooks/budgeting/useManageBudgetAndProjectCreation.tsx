import { useState } from 'react';

export const useManageBudgetAndProjectCreation = () => {
  const [modal, setModal] = useState<
    'create_budget' | 'create_project' | 'choose_action' | 'show_prompt' | null
  >(null);

  return {
    modal,
    setModal,
  };
};

export type UseManageBudgetAndProjectCreation = ReturnType<
  typeof useManageBudgetAndProjectCreation
>;
