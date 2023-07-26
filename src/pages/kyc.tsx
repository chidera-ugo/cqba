import clsx from 'clsx';
import { UpdateBusinessDocumentionForm } from 'components/forms/kyc/UpdateBusinessDocumentionForm';
import { UpdateCompanyInformationForm } from 'components/forms/kyc/UpdateCompanyInformationForm';
import { UpdateOwnerInformationForm } from 'components/forms/kyc/UpdateOwnerInformationForm';
import { GreenCheck } from 'components/illustrations/Success';
import { AppLayout } from 'components/layouts/AppLayout';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { KycSteps } from 'components/modules/kyc/KycSteps';
import { ReviewAndSubmit } from 'components/modules/kyc/ReviewAndSubmit';
import { Cross } from 'components/svgs/navigation/Exit';
import { useCurrentAccountSetupStepUrl } from 'hooks/dashboard/kyc/useCurrentAccountSetupStepUrl';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useKycSteps } from 'hooks/kyc/useKycSteps';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Kyc() {
  const { currentTab, isValidAccountSetupStep, goToNextAccountSetupStep } =
    useKycSteps();

  const { replace, query } = useRouter();

  const { isVerified } = useIsVerified();

  const { getCurrentAccountSetupStepUrl } = useCurrentAccountSetupStepUrl();

  useEffect(() => {
    if (isValidAccountSetupStep) return;

    replace(getCurrentAccountSetupStepUrl());
  }, [isValidAccountSetupStep]);

  if (isVerified)
    return (
      <AppLayout title='Setup your account' hideSideNavigation>
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
    <AppLayout
      title='Get Started'
      hideSideNavigation
      headerSlot={
        <Link href={'/'} className={'group hidden 1024:flex'}>
          <span
            className={'my-auto mr-1 text-sm font-medium group-hover:underline'}
          >
            Skip for Later
          </span>
          <span className='my-auto'>
            <Cross className={'h-5 w-5 text-primary-main'} />
          </span>
        </Link>
      }
    >
      <div
        className={clsx(
          query['showSteps'] === 'true' ? 'block' : 'hidden 768:block'
        )}
      >
        <h5>Activate your account</h5>
        <p className='mt-1 font-normal text-neutral-500'>
          Based on your business type, you will be required to submit the
          documents below during the business activation process.{' '}
        </p>
      </div>

      <div
        className={clsx(
          '768:kyc-layout-height mt-7 grid-cols-12 rounded-xl border-neutral-200 768:grid 768:border'
        )}
      >
        <div className='m-0 border-neutral-200 768:col-span-5 768:m-5 768:mr-0 768:border-r 1200:col-span-4'>
          <div className='mx-auto 768:max-w-[540px]'>
            <h5 className={'hidden 768:block'}>Setup Guide</h5>

            <div
              className={clsx(
                query['showSteps'] === 'true' ? 'block' : 'hidden 768:block'
              )}
            >
              <KycSteps />
            </div>
          </div>
        </div>

        <div
          className={clsx(
            query['showSteps'] === 'true' && 'hidden 768:block',
            'thin-scrollbar col-span-7 overflow-y-auto 768:mt-0 1200:col-span-8'
          )}
        >
          <div className='mx-auto h-full max-w-[540px] px-1 768:py-5 768:px-8'>
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
