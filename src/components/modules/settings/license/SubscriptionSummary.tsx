import clsx from 'clsx';
import { ComparePlans } from 'components/modules/settings/license/ComparePlans';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';
import Link from 'next/link';
import { useState } from 'react';
import { generatePlaceholderArray } from 'utils/generators/generatePlaceholderArray';

export const SubscriptionSummary = () => {
  const [showModal, setShowModal] = useState(false);

  const { isLoading, isError, data: _ } = useGetActiveSubscription();

  if (isLoading) return <IsLoadingIsError type={'loading'} />;
  if (isError) return <IsLoadingIsError type={'error'} />;

  return (
    <>
      <ComparePlans show={showModal} close={() => setShowModal(false)} />

      <div className='grid grid-cols-12 gap-5'>
        <div className='card y-between col-span-4 min-h-[156px] bg-primary-main'>
          <div className='x-between'>
            <p className={'my-auto text-sm font-light text-white'}>
              Free Trial Period
            </p>

            <div className={'pill_gray my-auto'}>8 days left</div>
          </div>

          <div>
            <h4 className={'text-xl font-medium text-white'}>Standard</h4>

            <p className={'mt-1 text-sm font-light text-white'}>
              Ideal for startups and small businesses needing basic spend
              management tools to reduce expenses
            </p>
          </div>
        </div>

        <div className='y-between card col-span-4 min-h-[156px]'>
          <p className={'text-sm font-light text-black'}>Next Payment Date</p>

          <h4 className={'text-medium text-2xl text-black'}>
            5th September, 2024
          </h4>
        </div>

        <div className='y-between card col-span-4 min-h-[156px]'>
          <p className={'text-sm font-light text-black'}>Next Payment Date</p>

          <div>
            <div className='flex'>
              <Link href={'/license/change-plan'} className='text_link'>
                Change Plan
              </Link>
            </div>

            <div className='flex'>
              <button
                onClick={() => setShowModal(true)}
                className='text_link mt-1'
              >
                Compare Plans
              </button>
            </div>

            <div className='flex'>
              <button className='text_link mt-1'>Renew Current Plan</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const IsLoadingIsError = ({ type }: { type: 'loading' | 'error' }) => {
  return (
    <div className='grid grid-cols-12 gap-5'>
      {generatePlaceholderArray(3).map((id) => {
        return (
          <div
            className={clsx(
              'card y-center col-span-12 h-[156px] 640:col-span-6 640:h-[156px] 1280:col-span-4'
            )}
            key={id}
          >
            <div className='my-auto'>
              <div
                className={clsx(
                  'h-5 w-[50%]',
                  type === 'loading' ? 'skeleton' : 'skeleton-error'
                )}
              ></div>
              <div
                className={clsx(
                  'mt-4 h-8 w-[70%] 640:mt-4',
                  type === 'loading' ? 'skeleton' : 'skeleton-error'
                )}
              ></div>
              <div
                className={clsx(
                  'mt-3 h-4 w-[50%]',
                  type === 'loading' ? 'skeleton' : 'skeleton-error'
                )}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
