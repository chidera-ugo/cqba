import { AppLayout } from 'components/layouts/AppLayout';
import reimbursement from '/public/mockups/reimbursement.png';
import Image from 'next/image';

export default function Reimbursement() {
  return (
    <AppLayout title='Reimbursement'>
      <div className='relative min-h-[480px] grid-cols-10 gap-10 overflow-hidden rounded-2xl bg-neutral-100 1180:grid'>
        <div className='relative z-10 col-span-5 my-auto h-full p-7 640:p-12'>
          <div className='y-center h-full'>
            <h4 className='text-2xl 640:text-4xl'>Seamless Reimbursements</h4>

            <p className='mt-4 font-light leading-6 text-neutral-600'>
              {`A Game-Changing Reimbursement Feature, Coming Soon to ChequeBase.
              Get ready for a major upgrade in the way you manage your company's
              expenses with an intuitive and seamless reimbursement experience
              designed to save you time and effort while keeping your team
              happy.`}
            </p>

            <div className='flex'>
              <div className='secondary-button y-center mt-4 h-10 bg-transparent px-4'>
                Coming soon
              </div>
            </div>
          </div>
        </div>

        <div className={'min-h-[210px] 425:min-h-[280px] 480:min-h-[340px]'}>
          <Image
            src={reimbursement}
            alt='dashboard-mockup'
            className='absolute bottom-0 right-0 z-0 mt-auto w-[640px] 1180:-right-56 1180:w-[740px] 1280:-right-48 1340:-right-32 1600:-right-0'
          />
        </div>
      </div>
    </AppLayout>
  );
}
