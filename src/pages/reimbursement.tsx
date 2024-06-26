import { AppLayout } from 'components/layouts/AppLayout';
import reimbursement from '/public/mockups/reimbursement.png';
import Image from 'next/image';

export default function Reimbursement() {
  return (
    <AppLayout title='Reimbursement'>
      <div className='min-h-[480px] grid-cols-10 overflow-hidden rounded-2xl bg-neutral-100 640:grid'>
        <div className='col-span-6 my-auto h-full p-7 640:p-12 1280:col-span-5'>
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
        <div className='relative col-span-4 640:pt-12 1280:col-span-5'>
          <div className='x-center bottom-0 -right-24 w-full 640:absolute 1280:right-0'>
            <Image
              src={reimbursement}
              alt='card-mockup'
              className='mx-auto -mb-10 mt-auto min-w-[500px] max-w-[500px]'
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
