import { useAppContext } from 'context/AppContext';

export const useIsVerified = () => {
  const { user, screenSize } = useAppContext().state;

  const isVerified = user?.KYBStatus === 'approved' || user?.role !== 'owner';

  return {
    isVerified,
    screenSize,
  };
};
