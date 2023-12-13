import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';

export const useUserPlan = () => {
  const { data } = useGetActiveSubscription();

  return {
    isReady: !!data?.plan,
    isPremiumUser: data?.plan?.name === 'Premium',
  };
};
