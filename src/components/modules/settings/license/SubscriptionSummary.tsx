import clsx from 'clsx';
import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import { ManageSubscription } from 'components/modules/settings/license/ManageSubscription';
import { ComparePlans } from 'components/modules/settings/license/ComparePlans';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { CrossSubtract } from 'components/svgs/navigation/Exit';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';
import { useState } from 'react';
import { formatDate } from 'utils/formatters/formatDate';
import { generatePlaceholderArray } from 'utils/generators/generatePlaceholderArray';

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.updateLocale('en', {
  relativeTime: {
    future: '%s',
    past: '%s ago',
    s: 'a few seconds',
    m: '1 minute',
    mm: '%d minutes',
    h: '1 hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years',
  },
});

export type TSubscriptionSummaryCurrentModalType =
  | 'compare_plans'
  | 'change_plan'
  | 'renew_subscription'
  | null;

export const SubscriptionSummary = () => {
  const [currentModalType, setCurrentModalType] =
    useState<TSubscriptionSummaryCurrentModalType>(null);

  const { isLoading, isError, data } = useGetActiveSubscription();

  if (isLoading) return <IsLoadingIsError type={'loading'} />;
  if (isError || !data) return <IsLoadingIsError type={'error'} />;

  const { endingAt, plan, trial, renewAt } = data;

  function close() {
    setCurrentModalType(null);
  }

  const isPremiumUser = data?.plan?.name === 'Premium';

  return (
    <>
      <CentredModalWrapper
        closeOnClickOutside
        show={currentModalType === 'compare_plans'}
        hideHeader
        type={'zoom'}
        closeModal={close}
        className={'max-h-[80vh]'}
      >
        <div className='sticky top-0 left-0 z-[1200] flex justify-end rounded-t-xl p-5'>
          <button onClick={close} className='text-gray-400 hover:text-red-500'>
            <CrossSubtract className={'h-7 w-7'} />
          </button>
        </div>

        <ComparePlans
          headerClassname={'-mt-12 px-4 640:-mt-10 640:px-8'}
          tableWrapperClassName={'1280:w-[900px] px-4 640:px-8'}
        />
      </CentredModalWrapper>

      <ManageSubscription {...{ currentModalType, setCurrentModalType }} />

      <div className='grid grid-cols-12 gap-5'>
        <div className='card y-between col-span-12 min-h-[156px] bg-primary-main 640:col-span-6 1180:col-span-4'>
          <div className='x-between'>
            <p className={'my-auto text-sm font-light text-white'}>
              {trial ? 'First Time Trial' : 'Active Plan'}
            </p>

            <div className={'pill_gray my-auto'}>
              {dayjs(endingAt).fromNow()} Left
            </div>
          </div>

          <div>
            <h4 className={'text-xl font-medium text-white'}>{plan?.name}</h4>

            <p className={'mt-1 text-sm font-light text-white'}>
              {plan?.description}
            </p>
          </div>
        </div>

        <div className='y-between card col-span-12 min-h-[156px] 640:col-span-6 1180:col-span-4'>
          <p className={'text-sm font-light text-black'}>Next Payment Date</p>

          <h4 className={'text-medium text-2xl text-black'}>
            {formatDate(renewAt, 'short')}
          </h4>
        </div>

        <div className='y-between card col-span-12 min-h-[156px] 640:col-span-6 1180:col-span-4'>
          <p className={'text-sm font-light text-black'}>Payment Options</p>

          {isLoading || !data ? (
            <Spinner className={'h-6 w-6 text-primary-main'} />
          ) : (
            <div>
              {!isPremiumUser && (
                <div className='flex'>
                  <button
                    onClick={() => setCurrentModalType('change_plan')}
                    className='text_link'
                  >
                    Change Plan
                  </button>
                </div>
              )}

              <div className='flex'>
                <button
                  onClick={() => setCurrentModalType('compare_plans')}
                  className='text_link mt-1'
                >
                  Compare Plans
                </button>
              </div>

              <div className='flex'>
                <button
                  onClick={() => setCurrentModalType('renew_subscription')}
                  className='text_link mt-1'
                >
                  Renew Current Plan
                </button>
              </div>
            </div>
          )}
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
