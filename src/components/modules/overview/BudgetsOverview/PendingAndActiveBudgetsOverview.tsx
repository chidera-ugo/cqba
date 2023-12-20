import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { NoData } from 'components/core/Table/NoData';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { BudgetOverviewAccordionContent } from 'components/modules/overview/BudgetsOverview/BudgetOverviewAccordionContent';
import { EmptyReports } from 'components/svgs/overview/EmptyReports';
import { AnimatePresence, motion } from 'framer-motion';
import { useGetAllBudgetsUnpaginated } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useEffect, useState } from 'react';

export const PendingAndActiveBudgetsOverview = ({
  status,
}: {
  status?: string;
}) => {
  const [expandedBudget, setExpandedBudget] = useState('');

  const { isVerified } = useIsVerified();

  const { isLoading, isError, data } = useGetAllBudgetsUnpaginated(
    status,
    status === 'active'
  );

  const { getColor } = useGetColorByChar();

  useEffect(() => {
    const id = data?.docs[0]?._id;

    if (!data?.docs?.length || !id) return;

    setExpandedBudget(id);
  }, [data]);

  if (isVerified && isLoading) return <IsLoading />;

  if (isError) return <IsError className={'py-16'} />;

  return (
    <>
      {!data?.docs.length ? (
        <div>
          <NoData
            noToast
            processing={isLoading}
            icon={<EmptyReports />}
            subTitle={`Your Budget reports will be displayed here`}
          />
        </div>
      ) : (
        data?.docs?.map((budget) => {
          const { _id, name, beneficiaries } = budget;
          const isActive = expandedBudget === _id;

          return (
            <div
              key={_id}
              className={
                'mb-5 rounded-xl border border-neutral-180 bg-neutral-160'
              }
            >
              <button
                onClick={() => {
                  setExpandedBudget(isActive ? '' : _id);
                }}
                type={'button'}
                id={_id}
                className={clsx('x-between h-[56px] w-full px-3 text-black')}
              >
                <div className='my-auto flex gap-2'>
                  {status === 'pending' && (
                    <Avatar
                      getBackgroundColor={getColor}
                      size={32}
                      avatar={beneficiaries[0]?.avatar}
                      initials={beneficiaries[0]?.email?.charAt(0)}
                      className={'my-auto'}
                    />
                  )}

                  <span className='my-auto text-sm 640:text-base'>{name}</span>
                </div>

                <span
                  className={clsx(
                    'my-auto transition-transform',
                    isActive && 'rotate-180'
                  )}
                >
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 25 25'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M11.3067 16.1594C12.0797 16.887 13.2855 16.887 14.0585 16.1594L21.9024 8.77689C22.3061 8.39696 22.3254 7.76171 21.9454 7.35803C21.5655 6.95434 20.9303 6.93509 20.5266 7.31503L12.6826 14.6976L4.83866 7.31503C4.43498 6.93509 3.79973 6.95434 3.4198 7.35802C3.03986 7.76171 3.05911 8.39696 3.46279 8.77689L11.3067 16.1594Z'
                      fill='#98A2B3'
                    />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial='collapsed'
                    animate='open'
                    exit='collapsed'
                    variants={{
                      open: {
                        height: 'auto',
                      },
                      collapsed: {
                        height: 0,
                        overflow: 'hidden',
                      },
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className={'border-t border-neutral-190'}
                  >
                    <div className={'h-full px-4 pt-2 pb-2'}>
                      <BudgetOverviewAccordionContent
                        currentTab={status}
                        getColor={getColor}
                        {...budget}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })
      )}
    </>
  );
};
