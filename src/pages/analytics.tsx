import { AppLayout } from 'components/layouts/AppLayout';
import analytics from '/public/mockups/analytics.png';
import Image from 'next/image';

export default function Analytics() {
  return (
    <AppLayout title='Analytics'>
      <div className='min-h-[480px] grid-cols-10 overflow-hidden rounded-2xl bg-neutral-100 640:grid'>
        <div className='col-span-6 my-auto h-full p-7 640:p-12 1280:col-span-5'>
          <div className='y-center h-full'>
            <h4 className='text-2xl 640:text-4xl'>Spend Analytics</h4>

            <p className='mt-4 font-light leading-6 text-neutral-600'>
              {`Get ready to take control of your finances like never before with Spend Management Analytics, coming soon to ChequeBase. Gain insights, track expenses, and optimize your spending effortlessly. Stay tuned for a smarter way to manage your money! 💼💰`}
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
              src={analytics}
              alt='card-mockup'
              className='mx-auto mt-auto min-w-[500px] max-w-[500px]'
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
