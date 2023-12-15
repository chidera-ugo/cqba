import clsx from 'clsx';
import { LogoutButton } from 'components/buttons/Logout';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { SimpleToast } from 'components/commons/SimpleToast';
import { IsLoading } from 'components/data-states/IsLoading';
import { UpdateBusinessDocumentionForm } from 'components/forms/kyc/UpdateBusinessDocumentionForm';
import { UpdateCompanyInformationForm } from 'components/forms/kyc/UpdateCompanyInformationForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { SupportCard } from 'components/modules/app/SupportCard';
import { KycSteps } from 'components/modules/kyc/KycSteps';
import { ManageBusinessOwnersAndDirectors } from 'components/modules/kyc/ManageBusinessOwnersAndDirectors';
import { ReviewAndSubmit } from 'components/modules/kyc/ReviewAndSubmit';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import { useCurrentAccountSetupStepUrl } from 'hooks/dashboard/kyc/useCurrentAccountSetupStepUrl';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useKycSteps } from 'hooks/kyc/useKycSteps';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Kyc() {
  const { currentTab, isValidAccountSetupStep } = useKycSteps();

  const { replace, query } = useRouter();

  const { isVerified } = useIsVerified();

  const { getCurrentAccountSetupStepUrl } = useCurrentAccountSetupStepUrl();

  const { isUnderReview, hasProvidedCompanyInformation } =
    useAccountVerificationStatus();

  const { isRefetching } = useGetOrganizationInformation();

  const showSteps = query['showSteps'] === 'true';

  useEffect(() => {
    if (isValidAccountSetupStep) return;

    replace(getCurrentAccountSetupStepUrl());
  }, [isValidAccountSetupStep]);

  useEffect(() => {
    if (isUnderReview && query['tab'] !== 'review-and-submit')
      replace('/kyc?tab=review-and-submit');
    else if (
      query['tab'] === 'business-documentation' &&
      !hasProvidedCompanyInformation
    )
      replace('/kyc?tab=company-information');
  }, [query['tab']]);

  useEffect(() => {
    if (!isVerified) return;

    replace('/');
  }, [isVerified]);

  if (isVerified) return <FullScreenLoader show white id={'kyc'} />;

  return (
    <AppLayout
      title='Get Started'
      hideSideNavigation
      headerClassname={'border-b-none'}
      headerSlot={<LogoutButton />}
    >
      <SimpleToast show={isRefetching && showSteps}>Updating...</SimpleToast>

      <div className='relative gap-5 768:flex'>
        <div
          className={clsx(
            'hidden-scrollbar 640:kyc_layout_height sticky top-[108px] h-full w-[360px] flex-col justify-between overflow-y-auto',
            showSteps ? 'flex' : 'hidden 768:flex'
          )}
        >
          <div>
            <h4 className={'text-2xl font-medium'}>Activate your account</h4>
            <p className='mt-2 text-[13px] font-normal leading-5 text-neutral-500 640:mt-1'>
              Welcome to Chequebase, your account is almost ready. We just need
              a few final details about your company to validate your account.
            </p>

            <div className={clsx(showSteps ? 'block' : 'hidden 768:block')}>
              <KycSteps />
            </div>
          </div>

          <div className='mt-8'>
            <SupportCard />
          </div>
        </div>

        <div
          className={clsx(
            showSteps && 'hidden 768:block',
            '640:kyc_layout_height w-full overflow-y-auto rounded-xl border-neutral-200 768:border'
          )}
        >
          <div className={clsx('w-full overflow-y-auto 768:mt-0')}>
            <div className='mx-auto h-full max-w-[540px] px-1 768:py-8 768:px-8'>
              {currentTab === 'review-and-submit' ? (
                <ReviewAndSubmit />
              ) : currentTab === 'business-documentation' ? (
                <>
                  {!hasProvidedCompanyInformation ? (
                    <IsLoading />
                  ) : (
                    <UpdateBusinessDocumentionForm />
                  )}
                </>
              ) : currentTab === 'owners-information' ? (
                <div>
                  <h5>{`Owners' Information`}</h5>

                  <ManageBusinessOwnersAndDirectors />
                </div>
              ) : currentTab === 'company-information' ? (
                <UpdateCompanyInformationForm />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
