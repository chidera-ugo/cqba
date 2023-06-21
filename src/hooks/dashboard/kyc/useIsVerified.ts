import { useAppContext } from 'context/AppContext';

export const useIsVerified = () => {
  const { user, screenSize } = useAppContext().state;

  const isVerified = user?.kybStatus === 'completed';

  return {
    isVerified,
    screenSize,
  };
};
