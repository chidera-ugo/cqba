import { AppLayout } from 'components/layouts/AppLayout';
import card from '/public/mockups/card.png';
import Image from 'next/image';

export default function Cards() {
  return (
    <AppLayout title='Cards'>
      <div className='min-h-[480px] grid-cols-10 overflow-hidden rounded-2xl bg-neutral-100 640:grid'>
        <div className='col-span-6 my-auto h-full p-7 640:p-12 1280:col-span-5'>
          <div className='y-center h-full'>
            <h4 className='text-2xl 640:text-4xl'>Physical & Virtual cards</h4>

            <p className='mt-4 font-light leading-6 text-neutral-600'>
              {`Chequebase physical and virtual debit card. Designed to
              revolutionize your online payment and company expense management,
              these tools eliminate the stress of lost cards, enabling secure
              and seamless transactions. Embrace our hassle-free solution and
              empower your team in ways you've never imagined.`}
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
              src={card}
              alt='card-mockup'
              className='mx-auto -mb-20 mt-auto min-w-[540px] max-w-[540px]'
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
