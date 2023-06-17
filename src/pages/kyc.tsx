import { UpdateBusinessDocumentionForm } from 'components/forms/get-started/UpdateBusinessDocumentionForm';
import { UpdateCompanyInformationForm } from 'components/forms/get-started/UpdateCompanyInformationForm';
import { UpdateOwnerInformationForm } from 'components/forms/get-started/UpdateOwnerInformationForm';
import { GreenCheck } from 'components/illustrations/Success';
import { AppLayout } from 'components/layouts/AppLayout';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { KycSteps } from 'components/modules/kyc/KycSteps';
import { ReviewAndSubmit } from 'components/modules/kyc/ReviewAndSubmit';
import { useAppContext } from 'context/AppContext';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import { useCurrentAccountSetupStepUrl } from 'hooks/dashboard/kyc/useCurrentAccountSetupStepUrl';
import { useKycSteps } from 'hooks/kyc/useKycSteps';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Kyc() {
  const { user } = useAppContext().state;

  const { currentTab, isValidAccountSetupStep, goToNextAccountSetupStep } =
    useKycSteps();

  const { replace } = useRouter();

  const { isVerified } = useAccountVerificationStatus();

  const { getCurrentAccountSetupStepUrl } = useCurrentAccountSetupStepUrl();

  useEffect(() => {
    if (isValidAccountSetupStep) return;

    replace(getCurrentAccountSetupStepUrl());
  }, [isValidAccountSetupStep]);

  if (isVerified)
    return (
      <AppLayout title='Setup your account'>
        <div className='py-10'>
          <SimpleInformation
            title={<div className='text-xl'>Account Verified</div>}
            description={
              <span className='mt-1 block'>
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
    <AppLayout title='Get Started'>
      <div className='hidden 768:block'>
        <h5>Hi {user?.firstName}, Welcome to ChequeBase</h5>
        <p className='mt-1 font-normal text-neutral-500'>
          Let’s get you started with with managing your finances
        </p>
      </div>

      <div className='768:get-started-layout-height mt-7 grid-cols-12 rounded-xl border-neutral-200 768:grid 768:border'>
        <div className='col-span-5 border-neutral-200 768:m-5 768:mr-0 768:border-r 1200:col-span-4'>
          <div className='mx-auto max-w-[540px]'>
            <h5>Setup Guide</h5>
            <KycSteps />
          </div>
        </div>

        <div className='thin-scrollbar col-span-7 mt-5 overflow-y-auto 768:mt-0 1200:col-span-8'>
          <div className='mx-auto h-full max-w-[540px] py-5 px-1 768:px-8'>
            {currentTab === 'review-and-submit' ? (
              <ReviewAndSubmit />
            ) : currentTab === 'business-documentation' ? (
              <UpdateBusinessDocumentionForm />
            ) : currentTab === 'owner-information' ? (
              <UpdateOwnerInformationForm />
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
    </AppLayout>
  );
}
