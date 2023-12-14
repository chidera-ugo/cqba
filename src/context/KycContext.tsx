import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { IsError } from 'components/data-states/IsError';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { useAppContext } from 'context/AppContext';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';
import { useGetAllWallets } from 'hooks/api/wallet/useGetAllWallets';
import { PropsWithChildren, createContext, useContext } from 'react';

const KycContext = createContext(null);

function KycContextProvider({ children }: PropsWithChildren<any>) {
  useGetAllWallets();
  const { isLoading, isError } = useGetOrganizationInformation();
  const { isLoading: _l, isError: _e } = useGetActiveSubscription();
  const { user } = useAppContext().state;

  if (!!user?.organization && (isLoading || _l))
    return <FullScreenLoader white show={isLoading} id={'kyc_context'} />;

  if (isError || _e)
    return (
      <AuthLayout noRedirect>
        <IsError className={'py-20'} description={'Failed to load dashboard'} />
      </AuthLayout>
    );

  return <KycContext.Provider value={null}>{children}</KycContext.Provider>;
}

function useKycContext() {
  const context = useContext(KycContext);

  if (context === undefined) throw new Error(`No provider for KycContext`);

  return context;
}

export { KycContextProvider, useKycContext };
