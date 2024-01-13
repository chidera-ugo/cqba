import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';

export const useCurrentAccountSetupStepUrl = () => {
  const {
    hasProvidedAllRequirements,
    hasProvidedCompanyInformation,
    hasProvidedOwnerInformationRequirements,
  } = useAccountVerificationStatus();

  function getCurrentAccountSetupStep() {
    if (hasProvidedAllRequirements) return 'review-and-submit';
    if (!hasProvidedCompanyInformation) return 'company-information';
    if (!hasProvidedOwnerInformationRequirements) return 'owners-information';
    return 'business-documentation';
  }

  return {
    getCurrentAccountSetupStep,
  };
};
