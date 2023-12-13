import clsx from 'clsx';
import { LogoutButton } from 'components/buttons/Logout';
import { SimpleToast } from 'components/commons/SimpleToast';
import { UpdateBusinessDocumentionForm } from 'components/forms/kyc/UpdateBusinessDocumentionForm';
import { UpdateCompanyInformationForm } from 'components/forms/kyc/UpdateCompanyInformationForm';
import { GreenCheck } from 'components/illustrations/Success';
import { AppLayout } from 'components/layouts/AppLayout';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
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
  const { currentTab, isValidAccountSetupStep, goToNextAccountSetupStep } =
    useKycSteps();

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
  }, [query['tab']]);

  if (isVerified)
    return (
      <AppLayout title='Setup your account' hideSideNavigation>
        <div className='py-10'>
          <SimpleInformation
            title={<div className='text-xl'>Account Verified</div>}
            description={
              <span className='mt-1 block px-2'>
                {`We have approved your application and an account has been created for you.`}
              </span>
            }
            actionButton={{
              action: () => replace('/'),
              text: 'Go Home',
            }}
            icon={<GreenCheck />}
          />
        </div>
      </AppLayout>
    );

  return (
    <AppLayout
      title='Get Started'
      hideSideNavigation
      headerClassname={'border-b-none'}
      headerSlot={<LogoutButton />}
    >
      <SimpleToast show={isRefetching && showSteps}>Updating...</SimpleToast>

      <div className='relative gap-5 768:flex'>
        <div className='sticky top-[108px] h-full w-[360px]'>
          <div className={clsx(showSteps ? 'block' : 'hidden 768:block')}>
            <h4 className={'text-2xl font-medium'}>Activate your account</h4>
            <p className='mt-2 text-[13px] font-normal leading-5 text-neutral-500 640:mt-1'>
              Welcome to Chequebase, your account is almost ready. We just need
              a few final details about your company to validate your account.
            </p>

            <div className={clsx(showSteps ? 'block' : 'hidden 768:block')}>
              <KycSteps />
            </div>
          </div>

          {/*  Todo: Add support */}
        </div>

        <div
          className={clsx(
            showSteps && 'hidden 768:block',
            'w-full rounded-xl border-neutral-200 768:border'
          )}
        >
          <div className={clsx('w-full overflow-y-auto 768:mt-0')}>
            <div className='mx-auto h-full max-w-[540px] px-1 768:py-5 768:px-8'>
              {currentTab === 'review-and-submit' ? (
                <ReviewAndSubmit />
              ) : currentTab === 'business-documentation' ? (
                <>
                  {hasProvidedCompanyInformation ? (
                    <UpdateBusinessDocumentionForm />
                  ) : (
                    <div className={'py-10'}>
                      <SimpleInformation
                        title={'Missed a step'}
                        description={
                          <span className={'mt-2 block'}>
                            You need to provide business information first
                          </span>
                        }
                        actionButton={{
                          action: () => goToNextAccountSetupStep(),
                          text: 'Continue',
                        }}
                      />
                    </div>
                  )}
                </>
              ) : currentTab === 'owners-information' ? (
                <div>
                  <h5>{`Owners' Information`}</h5>

                  <ManageBusinessOwnersAndDirectors />
                </div>
              ) : currentTab === 'company-information' ? (
                <UpdateCompanyInformationForm />
              ) : (
                <div className='y-center h-full'>
                  <SimpleInformation
                    title={<span>Done</span>}
                    description={
                      <span className='mt-2 block'>
                        {`You've completed this step already`}
                      </span>
                    }
                    actionButton={{
                      action: goToNextAccountSetupStep,
                      text: 'Proceed',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
