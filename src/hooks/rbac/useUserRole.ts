import { useAppContext } from 'context/AppContext';

export const useUserRole = () => {
  const { user } = useAppContext().state;

  return {
    role: user?.role,
    isOwner: user?.role === 'owner',
  };
};
