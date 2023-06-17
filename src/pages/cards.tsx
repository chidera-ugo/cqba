import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { useState } from 'react';
import card from '/public/cards/card.png';
import virtual_card from '/public/cards/virtual-card.png';
import Image from 'next/image';
import { CreateCard } from 'components/modules/cards/CreateCard';

export default function Cards() {
  const [showModal, setShowModal] = useState(false);

  function closeModal() {
    setShowModal(false);
  }

  return (
    <AppLayout title='Cards'>
      <div className='min-h-[337px] grid-cols-10 overflow-hidden rounded-2xl bg-neutral-100 640:grid'>
        <div className='col-span-6 my-auto h-full p-7 640:p-12 1280:col-span-5'>
          <div className='y-center h-full'>
            <h4 className='text-4xl'>Virtual cards</h4>

            <p className='mt-4 font-medium leading-6 text-neutral-600'>
              Experience the convenience of instantly receiving free virtual
              cards, designed to simplify your online payment management. Say
              goodbye to the frustrations of lost cards, and embrace a
              hassle-free solution for secure and seamless transactions.
            </p>

            <div className='flex'>
              <button
                onClick={() => setShowModal(true)}
                className='dark-button mt-4 h-10 px-4'
              >
                Create card
              </button>
            </div>
          </div>
        </div>

        <div className='relative col-span-4 640:pt-12 1280:col-span-5'>
          <div className='x-center bottom-0 -right-16 w-full 640:absolute 1280:right-0'>
            <Image
              src={virtual_card}
              alt='card-mockup'
              className='mx-auto mt-auto min-w-[317px] max-w-[317px]'
            />
          </div>
        </div>
      </div>

      <div className='mt-8 min-h-[337px] grid-cols-10 overflow-hidden rounded-2xl bg-neutral-100 640:grid'>
        <div className='col-span-6 my-auto h-full p-7 640:p-12 1280:col-span-5'>
          <div className='y-center h-full'>
            <h4 className='text-4xl'>Chequebase physical cards</h4>

            <p className='mt-4 font-medium leading-6 text-neutral-600'>
              {`Excited to introduce our platform's new addition: a game-changing
              physical debit card for streamlined, secure company expense
              management, empowering your team like never before.`}
            </p>

            <div className='flex'>
              <div className='secondary-button y-center mt-4 h-10 bg-transparent px-4'>
                Coming soon
              </div>
            </div>
          </div>
        </div>

        <div className='relative col-span-4 640:pt-12 1280:col-span-5'>
          <div className='x-center bottom-0 -right-16 w-full 640:absolute 1280:right-0'>
            <Image
              src={card}
              alt='card-mockup'
              className='mx-auto mt-auto min-w-[317px] max-w-[317px]'
            />
          </div>
        </div>
      </div>

      <RightModalWrapper
        show={showModal}
        title='Create Card'
        closeModal={closeModal}
        closeOnClickOutside
        childrenClassname='py-0 640:px-8 px-4'
      >
        <CreateCard close={closeModal} />
      </RightModalWrapper>
    </AppLayout>
  );
}
