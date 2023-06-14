import { useGetOrganizationInformation } from 'hooks/api/useGetOrganizationInformation';
import { PropsWithChildren, createContext, useContext } from 'react';

const KycContext = createContext(null);

function KycContextProvider({ children }: PropsWithChildren<any>) {
  useGetOrganizationInformation();

  return <KycContext.Provider value={null}>{children}</KycContext.Provider>;
}

function useKycContext() {
  const context = useContext(KycContext);

  if (context === undefined) throw new Error(`No provider for KycContext`);

  return context;
}

export { KycContextProvider, useKycContext };
