import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { useAppContext } from 'context/AppContext';
import { EmployeeRoles } from 'enums/employee_enum';
import { useCloseBudget } from 'hooks/api/budgeting/useCloseBudget';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { usePauseBudget } from 'hooks/api/budgeting/usePauseBudget';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { formatAmount } from 'utils/formatters/formatAmount';
import { formatDate } from 'utils/formatters/formatDate';

type Props = IBudget & {
  showFullDetails?: boolean;
  onItemClick?: (res: any) => void;
  getColor: (char: string) => string;
  className?: string;
  showActions?: boolean;
};

export const BudgetCard = ({ getColor, showActions, ...budget }: Props) => {
  const { screenSize } = useAppContext().state;
  const [mode, setMode] = useState<'success' | 'authorize' | null>(null);

  const queryClient = useQueryClient();

  const {
    _id,
    // description,
    amountUsed,
    expiry,
    name,
    currency,
    beneficiaries,
    // status,
    amount,
    approvedBy,
    approvedDate,
    availableAmount,
    threshold,
  } = budget;

  const { push } = useRouter();

  // const budgetIsActive = status !== 'open' && status !== 'declined';

  function getWidth(val: number) {
    return `${Math.round((val * 100) / amount)}%`;
  }

  const breakdown = [
    {
      title: 'Spent',
      className: 'bg-primary-main',
      value: amountUsed,
    },
    {
      title: 'Available',
      className: 'bg-neutral-200',
      value: availableAmount,
    },
    {
      title: 'Budget Threshold',
      className: 'bg-neutral-300',
      value: threshold,
      disabled: threshold === amount,
    },
  ];

  const { isLoading: pausing, mutate: pause } = usePauseBudget(budget._id, {
    onSuccess() {
      queryClient.invalidateQueries(['budget', budget._id]);
      setMode(null);
    },
  });

  const { isLoading: closing, mutate: close } = useCloseBudget(budget._id);

  return (
    <>
      <AuthorizeActionWithPin
        mode={mode}
        show={!!mode}
        showBackground
        title={mode !== 'success' ? 'Pause Budget' : ''}
        close={() => setMode(null)}
        processing={pausing}
        finish={() => {
          setMode(null);
        }}
        successTitle={'Budget Paused'}
        successMessage={`You have paused this budget successfully`}
        actionMessage={'Pause Budget'}
        submit={(pin) => pause({ pin })}
      />

      <button
        type={'button'}
        className={clsx(
          'card relative col-span-12 block w-full text-left 640:col-span-6 1280:col-span-4',
          showActions
            ? 'cursor-default'
            : 'cursor-pointer hover:border-neutral-300'
        )}
        onClick={() => {
          push(`/budgeting/${_id}`);
        }}
      >
        <div className={clsx(showActions && 'x-between')}>
          <div
            className={clsx(
              'flex gap-2 align-middle 640:gap-3',
              !showActions && 'justify-between'
            )}
          >
            <div className={clsx(showActions ? 'hidden' : 'block')}>
              <div className={'text-sm font-medium 640:text-base'}>{name}</div>

              {showActions && approvedDate && approvedBy ? (
                <div className={'text-[10px] text-neutral-500'}>
                  Approve by {EmployeeRoles[approvedBy!.role]}:{' '}
                  {formatDate(approvedDate, 'semi-full')}
                </div>
              ) : expiry ? (
                <div className={'text-[10px] text-neutral-500'}>
                  Due Date: {formatDate(expiry, 'semi-full')}
                </div>
              ) : null}
            </div>

            <div className={clsx('relative flex', showActions && 'ml-2')}>
              {beneficiaries?.map(({ email }, i) => {
                return (
                  <div
                    key={email}
                    className={clsx(
                      showActions ? 'block' : 'absolute',
                      'right-0 top-0 z-10'
                    )}
                    style={{
                      zIndex: 10 + i,
                      right: 23 * i,
                    }}
                  >
                    <Avatar
                      className={clsx('-ml-2 ring-2 ring-white')}
                      size={
                        showActions ? (screenSize?.['mobile'] ? 33 : 44) : 27
                      }
                      key={email}
                      char={email.charAt(0)}
                      getBackgroundColor={getColor}
                    />
                  </div>
                );
              })}
            </div>

            <div className={clsx(!showActions ? 'hidden' : 'block')}>
              <div className={'text-sm font-medium 640:text-base'}>{name}</div>

              {showActions && approvedDate && approvedBy ? (
                <div className={'text-[10px] text-neutral-500'}>
                  Approve by {EmployeeRoles[approvedBy!.role]}:{' '}
                  {formatDate(approvedDate, 'semi-full')}
                </div>
              ) : expiry ? (
                <div className={'text-[10px] text-neutral-500'}>
                  Due Date: {formatDate(expiry, 'semi-full')}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className={'mt-6 text-sm font-medium'}>
          Total Budget: {currency}
          {formatAmount({ value: amount / 100 })}
        </div>

        <div className='relative mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-200'>
          {threshold !== amount && (
            <div
              className={
                'absolute left-0 top-0 h-full rounded-full bg-neutral-300'
              }
              style={{
                width: getWidth(threshold),
              }}
            ></div>
          )}

          <div
            className={
              'absolute left-0 top-0 h-full rounded-full bg-primary-main'
            }
            style={{
              width: getWidth(amountUsed),
            }}
          ></div>
        </div>

        <div
          className={clsx(
            'hidden-scrollbar mt-4 flex overflow-y-auto',
            showActions ? 'gap-10' : 'gap-5'
          )}
        >
          {breakdown.map(({ title, disabled, value, className }) => {
            if (disabled) return <Fragment key={title} />;

            return (
              <div key={title} className={clsx(!showActions && 'w-full')}>
                <div className='flex w-full'>
                  <div className={'flex-shrink-0 text-[10px] text-neutral-500'}>
                    {title}
                  </div>

                  <div
                    className={clsx(
                      className,
                      'my-auto ml-1 flex-shrink-0 rounded-full'
                    )}
                    style={{
                      height: 7,
                      width: 7,
                    }}
                  ></div>
                </div>

                <div className='mt-0.5 w-full text-xs font-medium'>
                  {currency}
                  {formatAmount({
                    value: value / 100,
                    kFormatter: value > 99999999,
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {showActions && (
          <div className='right-5 top-5 mt-5 flex w-full gap-3 375:w-auto 768:absolute 768:mt-0'>
            <SubmitButton
              submitting={pausing}
              onClick={() => setMode('authorize')}
              type={'button'}
              className={'primary-button w-full 360:min-w-[125px] 425:w-auto'}
            >
              Pause Budget
            </SubmitButton>

            <SubmitButton
              submitting={closing}
              onClick={() => close(null)}
              type={'button'}
              className={'secondary-button w-full 360:min-w-[125px] 425:w-auto'}
            >
              Close Budget
            </SubmitButton>
          </div>
        )}
      </button>
    </>
  );
};
