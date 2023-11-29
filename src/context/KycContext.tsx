import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { useAppContext } from 'context/AppContext';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { PropsWithChildren, createContext, useContext } from 'react';

const KycContext = createContext(null);

function KycContextProvider({ children }: PropsWithChildren<any>) {
  const { isLoading } = useGetOrganizationInformation();
  const { user } = useAppContext().state;

  if (!!user?.organization && isLoading)
    return <FullScreenLoader white show={isLoading} id={'kyc_context'} />;

  return <KycContext.Provider value={null}>{children}</KycContext.Provider>;
}

function useKycContext() {
  const context = useContext(KycContext);

  if (context === undefined) throw new Error(`No provider for KycContext`);

  return context;
}

export { KycContextProvider, useKycContext };
