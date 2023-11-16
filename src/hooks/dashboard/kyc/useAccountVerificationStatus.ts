import { useAppContext } from 'context/AppContext';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';

export const useAccountVerificationStatus = () => {
  const { user } = useAppContext().state;

  const isVerified = user?.kybStatus === 'completed';

  const { data: organizationInformation } = useGetOrganizationInformation({
    enabled: !isVerified,
  });

  const isUnderReview = organizationInformation?.status === 'completed';

  const hasProvidedCompanyInformation =
    !!organizationInformation?.businessType &&
    !!organizationInformation.address;

  const hasProvidedOwnerInformation =
    !!organizationInformation?.owners?.length ||
    !!organizationInformation?.directors?.length;

  const hasProvidedDocuments = organizationInformation?.documents?.length;

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
    businessInformation: organizationInformation,
  };
};
