import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';

export const useCurrentAccountSetupStepUrl = () => {
  const {
    hasProvidedAllRequirements,
    hasProvidedCompanyInformation,
    hasProvidedOwnerInformationRequirements,
  } = useAccountVerificationStatus();

  function getCurrentAccountSetupStepUrl() {
    if (hasProvidedAllRequirements) return '/kyc?tab=review-and-submit';

    if (!hasProvidedCompanyInformation) return '/kyc?tab=company-information';

    if (!hasProvidedOwnerInformationRequirements)
      return '/kyc?tab=owner-information';

    return '/kyc?tab=business-documentation';
  }

  return {
    getCurrentAccountSetupStepUrl,
  };
};
