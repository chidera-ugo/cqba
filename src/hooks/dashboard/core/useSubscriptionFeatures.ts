import { useAppContext } from 'context/AppContext';

export const useSubscriptionFeatures = () => {
  const { user } = useAppContext().state;

  const features = user?.organization?.subscription?.features;

  const canCreateProject = !!features?.CREATE_PROJECT;
  const canCreateBudget = !!features?.CREATE_BUDGET;
  const canInviteUser = !!features?.INVITE_USER;

  return {
    canCreateProject,
    canCreateBudget,
    canInviteUser,
  };
};
