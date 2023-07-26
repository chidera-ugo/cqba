import { AppLayout } from 'components/layouts/AppLayout';
import integrations from '/public/mockups/integrations.png';
import Image from 'next/image';

export default function Integrations() {
  return (
    <AppLayout title='QuickBooks Integration'>
      <div className='relative min-h-[480px] grid-cols-10 gap-10 overflow-hidden rounded-2xl bg-neutral-100 1180:grid'>
        <div className='relative z-10 col-span-5 my-auto h-full p-7 640:p-12'>
          <div className='y-center h-full'>
            <h4 className='text-2xl 640:text-4xl'>QuickBooks Integration</h4>

            <p className='mt-4 font-light leading-6 text-neutral-600'>
              {`Hey there! We're excited to announce that our seamless integration
              with QuickBooks is just around the corner. We've been working
              tirelessly to bring you a streamlined experience, making it easier
              than ever to manage your finances and stay on top of your
              business.`}
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
            src={integrations}
            alt='integrations-mockup'
            className='absolute bottom-0 right-0 z-0 mt-auto w-[640px] 1180:-bottom-8 1180:-right-56 1180:w-[740px] 1280:-right-48 1340:-right-32 1600:-right-0'
          />
        </div>
      </div>
    </AppLayout>
  );
}
