import { useAppContext } from 'context/AppContext';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';

export const useAccountVerificationStatus = () => {
  const { user } = useAppContext().state;

  const isVerified = user?.KYBStatus === 'approved';

  const { data: organizationInformation, isLoading: gettingOrganizationInfo } =
    useGetOrganizationInformation({
      enabled: !isVerified,
    });

  const isUnderReview = organizationInformation?.status === 'completed';

  const hasProvidedCompanyInformation =
    !!organizationInformation?.businessType &&
    !!organizationInformation.address;

  const hasProvidedOwnerInformation =
    !!organizationInformation?.owners?.length ||
    !!organizationInformation?.directors?.length;

  const hasProvidedDocuments =
    organizationInformation?.documents?.utilityBill &&
    organizationInformation.documents.cacBn1 &&
    organizationInformation.documents.businessNameCert;

  const hasProvidedAllRequirements =
    hasProvidedCompanyInformation &&
    hasProvidedOwnerInformation &&
    hasProvidedDocuments;

  return {
    hasProvidedAllRequirements,
    isUnderReview,
    hasProvidedDocuments,
    hasProvidedOwnerInformationRequirements: hasProvidedOwnerInformation,
    hasProvidedCompanyInformation,
    isVerified,
    gettingOrganizationInfo,
    businessInformation: organizationInformation,
  };
};
