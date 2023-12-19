import { useUserRole } from 'hooks/access_control/useUserRole';
import { useState } from 'react';

export const useManageBudgetAndProjectCreation = () => {
  const [modal, setModal] = useState<
    'create_budget' | 'create_project' | 'choose_action' | 'show_prompt' | null
  >(null);

  const { isOwner } = useUserRole();

  return {
    modal,
    setModal,
    createBudget() {
      setModal(isOwner ? 'choose_action' : 'create_budget');
    },
  };
};

export type UseManageBudgetAndProjectCreation = ReturnType<
  typeof useManageBudgetAndProjectCreation
>;
