import { AppLayout } from 'components/layouts/AppLayout';
import { GetStartedSteps } from 'components/modules/get-started/GetStartedSteps';
import { UpdateCompanyInformation } from 'components/modules/get-started/UpdateCompanyInformation';
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
        className='mt-7 grid grid-cols-12 rounded-xl border border-neutral-200'
        style={{
          height: 'calc(100vh - 224px)',
        }}
      >
        <div className='col-span-4 m-5 border-r border-neutral-200'>
          <h5>Setup Guide</h5>
          <GetStartedSteps />
        </div>

        <div className='thin-scrollbar col-span-8 overflow-y-auto'>
          <div className='p-5'>
            {currentTab === 'company-information' && (
              <UpdateCompanyInformation />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
