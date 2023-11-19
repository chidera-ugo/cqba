import { useRouter } from 'next/router';

export const useIsKycFlow = () => {
  const { pathname } = useRouter();
  const isKycFlow = pathname === '/kyc';

  return {
    isKycFlow,
  };
};
