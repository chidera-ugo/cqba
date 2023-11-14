import { AppLayout } from 'components/layouts/AppLayout';
import integrations from '/public/mockups/integrations.png';
import Image from 'next/image';

export default function Integrations() {
  return (
    <AppLayout title='Third Party Integration'>
      <div className='min-h-[480px] grid-cols-10 overflow-hidden rounded-2xl bg-neutral-100 640:grid'>
        <div className='col-span-6 my-auto h-full p-7 640:p-12 1280:col-span-5'>
          <div className='y-center h-full'>
            <h4 className='text-2xl 640:text-4xl'>Third-party Integration</h4>

            <p className='mt-4 font-light leading-6 text-neutral-600'>
              Streamline Spending with Third-Party Integration! Connect your
              favorite financial tools seamlessly for smarter, more efficient
              spend management. Stay tuned for a game-changing feature that will
              transform your financial workflow. #ComingSoon
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
              src={integrations}
              alt='card-mockup'
              className='mx-auto mt-auto min-w-[500px] max-w-[500px]'
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
