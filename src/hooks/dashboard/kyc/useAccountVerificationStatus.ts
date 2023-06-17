import { useAppContext } from 'context/AppContext';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';

export const useAccountVerificationStatus = () => {
  const { user } = useAppContext().state;

  const isVerified = user?.kybStatus === 'DONE';

  const { data: organizationInformation } = useGetOrganizationInformation({
    enabled: !isVerified,
  });

  const isUnderReview = organizationInformation?.status === 'completed';

  const hasProvidedCompanyInformation =
    !!organizationInformation?.businessType &&
    !!organizationInformation.businessAddress;

  const hasProvidedOwnerInformation =
    !!organizationInformation?.formOfId && !!organizationInformation.bvn;

  const hasProvidedDocuments =
    organizationInformation?.bnNumberImageUrl &&
    organizationInformation.utilityBillType;

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
