import clsx from 'clsx';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import { ComparePlans } from 'components/modules/subscriptions/ComparePlans';
import { CrossSubtract } from 'components/svgs/navigation/Exit';
import { useAppContext } from 'context/AppContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useChooseSubscriptionPlan } from 'hooks/api/subscriptions/useChooseSubscriptionPlan';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';
import Link from 'next/link';
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

export const SubscriptionSummary = () => {
  const [showModal, setShowModal] = useState(false);

  const { isLoading, isError, data } = useGetActiveSubscription();
  const { getCurrentUser } = useAppContext();

  const { mutate, isLoading: choosingPlan } = useChooseSubscriptionPlan({
    onSuccess() {
      getCurrentUser!(null);
    },
  });

  if (isLoading) return <IsLoadingIsError type={'loading'} />;
  if (isError || !data) return <IsLoadingIsError type={'error'} />;

  const { endingAt, plan, trial, renewAt } = data;

  function close() {
    setShowModal(false);
  }

  return (
    <>
      <FullScreenLoader show={choosingPlan} id={'subscription_summary'} />

      <CentredModalWrapper
        closeOnClickOutside
        show={showModal}
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

          <div>
            <div className='flex'>
              <Link
                href={'/settings/license/change-plan'}
                className='text_link'
              >
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
              <button
                onClick={() => {
                  mutate({
                    plan: data?.plan?._id,
                    // Todo: Pass correct number of months
                    months: 1,
                    paymentMethod: 'wallet',
                  });
                }}
                className='text_link mt-1'
              >
                Renew Current Plan
              </button>
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
