import { companyInformationDocuments } from 'constants/kyc/company_information_documents';
import { useAppContext } from 'context/AppContext';
import { Business_typeEnum } from 'enums/business_type.enum';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';

export const useAccountVerificationStatus = () => {
  const { user } = useAppContext().state;

  const isVerified = user?.KYBStatus === 'approved';

  const {
    data: organizationInformation,
    isLoading: gettingOrganizationInfo,
    isRefetching: refetchingOrganization,
  } = useGetOrganizationInformation({
    enabled: !isVerified,
  });

  const isUnderReviewOrApproved =
    organizationInformation?.status === 'completed' ||
    organizationInformation?.status === 'approved';

  const hasProvidedCompanyInformation =
    !!organizationInformation?.businessType &&
    !!organizationInformation.address;

  const hasProvidedOwnerInformation =
    !!organizationInformation?.owners?.length ||
    !!organizationInformation?.directors?.length;

  const hasProvidedDocuments = checkHasProvidedBusinessDocumentation(
    organizationInformation?.businessType,
    organizationInformation?.documents
  );

  const hasProvidedAllRequirements =
    hasProvidedCompanyInformation &&
    hasProvidedOwnerInformation &&
    hasProvidedDocuments;

  return {
    hasProvidedAllRequirements,
    isUnderReviewOrApproved,
    hasProvidedDocuments,
    hasProvidedOwnerInformationRequirements: hasProvidedOwnerInformation,
    hasProvidedCompanyInformation,
    isVerified,
    gettingOrganizationInfo,
    refetchingOrganization,
    businessInformation: organizationInformation,
  };
};

export function checkHasProvidedBusinessDocumentation(
  businessType?: Business_typeEnum,
  documents?: Record<string, string>
) {
  if (!businessType) return false;

  const unprovidedDocument = companyInformationDocuments[businessType].find(
    ({ id }) => !documents?.[id]
  );

  return !unprovidedDocument;
}
