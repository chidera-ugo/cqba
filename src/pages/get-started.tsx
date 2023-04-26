import { UpdateCompanyInformationForm } from 'components/forms/get-started/UpdateCompanyInformationForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { GetStartedSteps } from 'components/modules/get-started/GetStartedSteps';
import { useAppContext } from 'context/AppContext';
import { useGetCurrentTab } from 'hooks/dashboard/get-started/useGetCurrentTab';

export default function GetStarted() {
  const { user } = useAppContext().state;
  const { currentTab } = useGetCurrentTab();

  return (
    <AppLayout title='Get Started'>
      <h5>Hi {user?.firstName}, Welcome to ChequeBase</h5>
      <p className='mt-1 font-normal text-neutral-500'>
        Let’s get you started with with managing your finances
      </p>

      <div
        className='mt-7 grid-cols-12 rounded-xl border border-neutral-200 768:grid'
        style={{
          height: 'calc(100vh - 224px)',
        }}
      >
        <div className='col-span-5 m-5 border-neutral-200 768:border-r 1200:col-span-4'>
          <h5>Setup Guide</h5>
          <GetStartedSteps />
        </div>

        <div className='thin-scrollbar col-span-7 overflow-y-auto 1200:col-span-8'>
          <div className='auth-container p-5'>
            {currentTab === 'company-information' && (
              <UpdateCompanyInformationForm />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
