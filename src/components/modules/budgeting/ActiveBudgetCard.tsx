import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { ActionDropdown } from 'components/core/Table/ActionDropdown';
import { RejectionReasonForm } from 'components/forms/budgeting/RejectionReasonForm';
import { Cancel } from 'components/illustrations/Cancel';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { MakeTransfer } from 'components/modules/wallet/MakeTransfer';
import { AppToast } from 'components/primary/AppToast';
import { Freeze, MiniLock } from 'components/svgs/budgeting/Budget_Icons';
import { budgetingFilterOptions } from 'constants/budgeting/filters';
import { useAppContext } from 'context/AppContext';
import { UserRoles } from 'enums/employee_enum';
import { useCloseBudget } from 'hooks/api/budgeting/useCloseBudget';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { usePauseBudget } from 'hooks/api/budgeting/usePauseBudget';
import { useQueryInvalidator } from 'hooks/app/useQueryInvalidator';
import { defaultStringifySearch } from 'hooks/client_api/search_params';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import { formatAmount } from 'utils/formatters/formatAmount';
import { formatDate } from 'utils/formatters/formatDate';
import { handleSort } from 'utils/handlers/handleSort';

type Props = IBudget & {
  showFullDetails?: boolean;
  getColor?: (char: string) => string;
  className?: string;
  showActions?: boolean;
  showOnlyBreakdown?: boolean;
  isProject?: boolean;
};

export const ActiveBudgetCard = ({
  getColor,
  showActions,
  showOnlyBreakdown,
  ...budget
}: Props) => {
  const { screenSize, user } = useAppContext().state;

  const [mode, setMode] = useState<'success' | 'authorize' | null>(null);
  const [action, setAction] = useState<'pause_and_unpause' | 'close' | null>(
    null
  );
  const [reason, setReason] = useState('');
  const [paused, setPaused] = useState(budget.paused);

  const { replace, push } = useRouter();
  const { invalidate, defaultInvalidator } = useQueryInvalidator();

  const backToBudgetingHref = `/budgeting${defaultStringifySearch({
    status: budgetingFilterOptions[1]!,
  })}`;

  const { isLoading: pausing, mutate: pause } = usePauseBudget(budget._id, {
    onSuccess(res) {
      setPaused(res.paused);
      onSuccess();
      setMode('success');
    },
  });

  const { isLoading: closing, mutate: close } = useCloseBudget(budget._id, {
    onSuccess(res) {
      replace(backToBudgetingHref).then(() => {
        onSuccess();
        toast(<AppToast>{res.message}</AppToast>, { type: 'success' });
      });
    },
  });

  const {
    _id,
    amountUsed,
    expiry,
    name,
    currency,
    beneficiaries,
    status,
    amount,
    approvedBy,
    approvedDate,
    balance,
    threshold,
  } = budget;

  const isOwner = user?.role === 'owner';

  const breakdown = [
    {
      title: 'Spent',
      className: 'bg-primary-main',
      value: amountUsed,
    },
    {
      title: 'Available',
      className: 'bg-neutral-200',
      value: balance,
    },
    {
      title: 'Budget Threshold',
      className: 'bg-neutral-300',
      value: threshold,
      disabled: threshold === amount,
    },
  ];

  function onSuccess() {
    defaultInvalidator(['budget', budget._id]);
    invalidate('budgets');
  }

  function getWidth(val: number) {
    return `${Math.round((val * 100) / amount)}%`;
  }

  const SubTitle = () => {
    return (
      <div className={'mt-px'}>
        {expiry ? (
          <div className={'text-sm font-light text-neutral-500'}>
            Due Date: {formatDate(expiry, 'short')}
          </div>
        ) : showActions && approvedDate && approvedBy ? (
          <div className={'text-sm font-light text-neutral-500'}>
            Approved by {UserRoles[approvedBy!.role]}:{' '}
            {formatDate(approvedDate, 'semi-full')}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <AuthorizeActionWithPin
        isSuccess={mode === 'success'}
        show={!!mode}
        showBackground
        icon={action === 'close' ? <Cancel /> : undefined}
        title={
          mode !== 'success'
            ? action === 'close'
              ? 'Close Budget'
              : `${paused ? 'Unfreeze' : 'Freeze'} Budget`
            : ''
        }
        close={() => {
          setMode(null);
          setAction(null);
        }}
        processing={pausing || closing}
        finish={() => {
          setMode(null);
          setAction(null);
        }}
        successTitle={!paused ? 'Budget Unfrozen' : 'Budget Frozen'}
        successMessage={`You have ${
          !paused ? 'unfrozen' : 'frozen'
        } this budget successfully`}
        actionMessage={
          action === 'close'
            ? 'Close Budget'
            : paused
            ? 'Unfreeze Budget'
            : 'Freeze Budget'
        }
        submit={(pin) => {
          if (action === 'close') {
            close({
              pin,
              reason,
            });
          } else {
            pause({ pin, pause: !paused });
          }
        }}
      />

      <RightModalWrapper
        closeModal={() => {
          setAction(null);
        }}
        title={'Close Budget'}
        show={action === 'close' && !mode}
        childrenClassname={'pt-4 px-8'}
      >
        <RejectionReasonForm
          proceed={(reason) => {
            setMode('authorize');
            setReason(reason);
          }}
        />
      </RightModalWrapper>

      <button
        type={'button'}
        className={clsx(
          'card relative col-span-12 block w-full text-left 640:col-span-6 1280:col-span-4',
          showActions || showOnlyBreakdown
            ? 'cursor-default'
            : 'cursor-pointer hover:border-neutral-300',
          paused && !showActions && 'opacity-50'
        )}
        onClick={() => {
          if (showActions || showOnlyBreakdown) return;

          push(`/budgeting/${_id}`);
        }}
      >
        {!showOnlyBreakdown && (
          <div className={clsx(showActions && 'x-between')}>
            <div
              className={clsx(
                'flex gap-2 align-middle 640:gap-3',
                !showActions && 'justify-between'
              )}
            >
              <div className={clsx(showActions ? 'hidden' : 'block')}>
                <div className={'text-sm font-medium 640:text-base'}>
                  {name}
                </div>

                <div className='min-h-[15px]'>
                  <SubTitle />
                </div>
              </div>

              {paused ? (
                <Frozen />
              ) : (
                <>
                  {getColor && (
                    <div
                      className={clsx('relative flex', showActions && 'ml-2')}
                    >
                      {handleSort({
                        data: beneficiaries,
                        sortBy: 'email',
                        direction: showActions ? 'desc' : 'asc',
                      })?.map(({ email }, i) => {
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
                                showActions
                                  ? screenSize?.['mobile']
                                    ? 33
                                    : 44
                                  : 27
                              }
                              key={email}
                              char={email.charAt(0)}
                              getBackgroundColor={getColor}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              <div className={clsx(!showActions ? 'hidden' : 'block')}>
                <div className={'text-sm font-medium 640:text-base'}>
                  {name}
                </div>

                <SubTitle />
              </div>
            </div>
          </div>
        )}

        <div className={clsx('text-sm', !showOnlyBreakdown && 'mt-6')}>
          <span className={'text-neutral-500'}>Total Budget:</span>{' '}
          <span className='font-medium text-black'>
            {currency}
            {formatAmount({ value: amount / 100 })}
          </span>
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
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {showActions && (
          <div className='right-5 top-5 mt-5 flex w-full gap-3 375:w-auto 768:absolute 768:mt-0'>
            {paused && (
              <button
                onClick={() => {
                  setAction('pause_and_unpause');
                  setMode('authorize');
                }}
                className={'group my-auto'}
              >
                <Frozen
                  className={'group-hover:text-primary-main'}
                  size={'md'}
                />
              </button>
            )}

            {status === 'closed' ? (
              <div
                className={
                  'primary-button y-center rounded-full bg-red-600 hover:bg-red-600'
                }
              >
                Budget Closed
              </div>
            ) : !isOwner ? (
              <MakeTransfer budget={budget} />
            ) : (
              <ActionDropdown
                options={[
                  {
                    icon: <Freeze />,
                    onClick() {
                      setAction('pause_and_unpause');
                      setMode('authorize');
                    },
                    title: `${paused ? 'Unfreeze' : 'Freeze'} Budget`,
                  },
                  {
                    icon: <MiniLock />,
                    onClick: () => setAction('close'),
                    title: 'Close Budget',
                  },
                ]}
                id={'budget_actions'}
              />
            )}
          </div>
        )}
      </button>
    </>
  );
};

export const Frozen = ({
  size = 'sm',
  className,
}: {
  size?: 'sm' | 'md';
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        'flex gap-1 rounded-full border border-neutral-200',
        size === 'sm' ? 'h-7 px-2' : 'h-11 px-4',
        className
      )}
    >
      <span className={'my-auto'}>
        <Freeze className={clsx(size === 'sm' ? 'h-4 w-4' : 'h-5 w-5')} />
      </span>
      <span
        className={clsx(
          'my-auto font-medium',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}
      >
        Frozen
      </span>
    </div>
  );
};
