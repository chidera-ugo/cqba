import { UpdateCompanyInformationForm } from 'components/forms/get-started/UpdateCompanyInformationForm';
import { UpdateOwnerInformationForm } from 'components/forms/get-started/UpdateOwnerInformationForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { SuccessInformation } from 'components/modules/common/SuccessInformation';
import { GetStartedSteps } from 'components/modules/get-started/GetStartedSteps';
import { useAppContext } from 'context/AppContext';
import { useGetCurrentTab } from 'hooks/dashboard/get-started/useGetCurrentTab';

export default function GetStarted() {
  const { user } = useAppContext().state;
  const { currentTab, next } = useGetCurrentTab();

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
            <GetStartedSteps />
          </div>
        </div>

        <div className='thin-scrollbar col-span-7 mt-5 overflow-y-auto 768:mt-0 1200:col-span-8'>
          <div className='mx-auto h-full max-w-[540px] py-5 px-1 768:px-8'>
            {currentTab === 'owner-information' ? (
              <UpdateOwnerInformationForm />
            ) : currentTab === 'company-information' ? (
              <UpdateCompanyInformationForm />
            ) : (
              <div className='y-center h-full'>
                <SuccessInformation
                  title='Done'
                  description={`You've completed this step already`}
                  icon='chat'
                  actionButton={{
                    action: next,
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
