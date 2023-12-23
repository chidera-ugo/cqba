import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { ActionDropdown } from 'components/core/Table/ActionDropdown';
import { RejectionReasonForm } from 'components/forms/budgeting/RejectionReasonForm';
import { Cancel } from 'components/illustrations/Cancel';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { MakeTransfer } from 'components/modules/wallet/MakeTransfer';
import { Freeze, MiniLock } from 'components/svgs/budgeting/Budget_Icons';
import { approvalsFilterOptions } from 'constants/approvals/filters';
import { budgetingFilterOptions } from 'constants/budgeting/filters';
import { useAppContext } from 'context/AppContext';
import { UserRoles } from 'enums/employee_enum';
import { useCloseBudgetOrProject } from 'hooks/api/budgeting/useCloseBudgetOrProject';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { usePauseBudgetOrProject } from 'hooks/api/budgeting/usePauseBudgetOrProject';
import { useQueryClientInvalidator } from 'hooks/app/useQueryClientInvalidator';
import { defaultStringifySearch } from 'hooks/client_api/search_params';
import { useRouter } from 'next/router';
import { Fragment, ReactNode, useState } from 'react';
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
  onClick?: () => void;
  isApprovalsPage?: boolean;
  isProjectPaused?: boolean;
  actionsSlot?: ReactNode;
};

export const ActiveBudgetCard = ({
  getColor,
  showActions,
  isProject,
  onClick,
  isApprovalsPage,
  isProjectPaused,
  showOnlyBreakdown,
  actionsSlot,
  ...budget
}: Props) => {
  const { query } = useRouter();

  const projectId = query['projectId'];
  const subBudgetId = query['subBudgetId'];

  const { screenSize, user } = useAppContext().state;

  const [mode, setMode] = useState<'success' | 'authorize' | null>(null);
  const [action, setAction] = useState<'pause' | 'unpause' | 'close' | null>(
    null
  );
  const [reason, setReason] = useState('');

  const { replace, push } = useRouter();
  const { invalidate, defaultInvalidator } = useQueryClientInvalidator();

  const backToBudgetingHref = `/${isApprovalsPage ? 'approvals' : 'budgeting'}${
    !!projectId && !!subBudgetId ? `/projects/${projectId}` : ''
  }${defaultStringifySearch({
    status: isApprovalsPage
      ? approvalsFilterOptions()[0]
      : budgetingFilterOptions[isProject ? 1 : 0],
  })}`;

  const { isLoading: pausing, mutate: pause } = usePauseBudgetOrProject(
    budget._id,
    isProject,
    {
      onSuccess() {
        onSuccess();
        setMode('success');
      },
    }
  );

  const { isLoading: closing, mutate: close } = useCloseBudgetOrProject(
    budget._id,
    isProject,
    {
      onSuccess() {
        replace(backToBudgetingHref).then(() => {
          onSuccess();
        });
      },
    }
  );

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
    allocatedAmount,
    unallocatedAmount,
    totalSpent,
    paused,
  } = budget;

  const isOwner = user?.role === 'owner';

  const breakdown = isProject
    ? [
        {
          title: 'Spent',
          className: 'bg-primary-main',
          value: totalSpent,
          order: 1,
        },
        {
          title: 'Allocated',
          className: 'bg-neutral-300',
          order: 2,
          value: allocatedAmount,
        },
        {
          title: 'Unallocated',
          className: 'bg-neutral-200',
          order: 3,
          value: unallocatedAmount,
        },
      ]
    : [
        {
          title: 'Spent',
          className: 'bg-primary-main',
          value: amountUsed,
          order: 1,
        },
        {
          title: 'Threshold',
          className: 'bg-neutral-300',
          value: threshold,
          order: 2,
          disabled: threshold === amount,
        },
        {
          title: 'Available',
          className: 'bg-neutral-200',
          order: 3,
          value: balance,
        },
      ];

  const entity = isProject ? 'Project' : 'Budget';

  function onSuccess() {
    if (action !== 'close') {
      defaultInvalidator(['budget', budget._id]);
      defaultInvalidator(['project']);
    }

    invalidate('budgets');
  }

  function getWidth(val: number) {
    return `${Math.round((val * 100) / amount)}%`;
  }

  const SubTitle = () => {
    return (
      <div
        className={clsx(
          'font-normal text-neutral-500',
          showActions ? 'text-sm 640:text-base' : 'text-xs 640:text-sm'
        )}
      >
        {expiry ? (
          <div>Due Date: {formatDate(expiry, 'short')}</div>
        ) : showActions && approvedDate && approvedBy ? (
          <div>
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
        hasResponse={mode === 'success'}
        show={!!mode}
        showBackground
        icon={action === 'close' ? <Cancel /> : undefined}
        modalTitle={
          mode !== 'success'
            ? action === 'close'
              ? `Close ${entity}`
              : `${paused ? 'Unfreeze' : 'Freeze'} ${entity}`
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
        responseTitle={
          action === 'unpause' ? `${entity} Unfrozen` : `${entity} Frozen`
        }
        responseMessage={`You have ${
          action === 'unpause' ? 'unfrozen' : 'frozen'
        } this ${entity.toLowerCase()} successfully`}
        authorizeButtonText={
          action === 'close'
            ? `Close ${entity}`
            : action === 'unpause'
            ? `Unfreeze ${entity}`
            : `Freeze ${entity}`
        }
        submit={(pin) => {
          if (action === 'close') {
            close({
              pin,
              reason,
            });
          } else {
            pause({ pin, pause: action === 'pause' });
          }
        }}
      />

      <RightModalWrapper
        closeModal={() => {
          setAction(null);
        }}
        title={`Close ${entity}`}
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
          (paused || isProjectPaused) && !showActions && 'opacity-50'
        )}
        onClick={() => {
          if (showActions || showOnlyBreakdown) return;

          if (onClick) return onClick();

          if (isProject) return push(`/budgeting/projects/${_id}`);

          push(`/${isApprovalsPage ? 'approvals' : 'budgeting'}/${_id}`);
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
                <div className={'text-base font-medium 640:text-xl'}>
                  {name}
                </div>

                <div className='min-h-[15px]'>
                  <SubTitle />
                </div>
              </div>

              {(paused || isProjectPaused) && !showActions ? (
                <Frozen />
              ) : (
                <>
                  {getColor && !!beneficiaries?.length && (
                    <div
                      className={clsx(
                        'relative flex',
                        showActions && !!beneficiaries?.length && 'ml-2'
                      )}
                    >
                      {handleSort({
                        data: beneficiaries,
                        sortBy: 'email',
                        direction: showActions ? 'desc' : 'asc',
                      })?.map(({ email, avatar, firstName, lastName }, i) => {
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
                              avatar={avatar}
                              className={clsx('-ml-2 ring-2 ring-white')}
                              size={
                                showActions
                                  ? screenSize?.['mobile']
                                    ? 33
                                    : 56
                                  : 33
                              }
                              key={email}
                              initials={
                                !!firstName
                                  ? `${firstName?.charAt(0)}${lastName?.charAt(
                                      0
                                    )}`
                                  : email?.charAt(0)
                              }
                              getBackgroundColor={getColor}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              <div className={clsx(!showActions ? 'hidden' : 'flex')}>
                <div>
                  <div className={'text-base font-medium 640:text-xl'}>
                    {name}
                  </div>

                  <SubTitle />
                </div>

                {showActions && <div className='block w-16 768:hidden'></div>}
              </div>
            </div>
          </div>
        )}

        <div
          className={clsx(
            showActions ? 'text-base 640:text-xl' : 'text-base',
            !showOnlyBreakdown && 'mt-6'
          )}
        >
          <span className={'font-medium text-neutral-500'}>
            {!showActions && 'Total '}Budget:
          </span>{' '}
          <span className='font-semibold text-black'>
            {currency}
            {formatAmount({ value: amount / 100 })}
          </span>
        </div>

        <div
          className={clsx(
            'relative mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-200'
          )}
        >
          {handleSort({
            data: breakdown,
            sortBy: 'order',
          })?.map(({ title, className, disabled, value }, i) => {
            if (disabled || value === undefined || value === null)
              return <Fragment key={title} />;

            return (
              <div
                key={title}
                className={clsx(
                  'absolute left-0 top-0 h-full rounded-full',
                  className
                )}
                style={{
                  width: getWidth(value),
                  zIndex: (i + 1) * 10,
                }}
              ></div>
            );
          })}
        </div>

        <div className='flex flex-col gap-5 768:gap-0'>
          <div
            className={clsx(
              'hidden-scrollbar mt-4 flex overflow-y-auto',
              showActions ? 'gap-10' : 'gap-5'
            )}
          >
            {breakdown?.map(({ title, disabled, value, className }) => {
              if (disabled || value === undefined || value === null)
                return <Fragment key={title} />;

              return (
                <div key={title} className={clsx(!showActions && 'w-full')}>
                  <div className='flex w-full'>
                    <div
                      className={clsx(
                        'flex-shrink-0 text-neutral-500',
                        showActions ? 'text-sm 640:text-base' : 'text-sm'
                      )}
                    >
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

                  <div
                    className={clsx(
                      'mt-0.5 w-full font-semibold',
                      showActions ? 'text-base 640:text-xl' : 'text-base'
                    )}
                  >
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
            <div className='right-2 top-5 flex w-full justify-between gap-3 375:w-auto 768:absolute'>
              <div className={'flex gap-3'}>
                {status === 'active' && !paused && actionsSlot}

                {paused && (
                  <button
                    onClick={() => {
                      if (!isOwner) return;

                      setAction('unpause');
                      setMode('authorize');
                    }}
                    className={'group my-auto disabled:opacity-80'}
                    disabled={!isOwner}
                  >
                    <Frozen
                      className={clsx(
                        isOwner && 'group-hover:text-primary-main'
                      )}
                      size={'md'}
                    />
                  </button>
                )}
              </div>

              <div>
                {status === 'closed' ? (
                  <div
                    className={
                      'primary-button y-center rounded-full bg-red-600 hover:bg-red-600'
                    }
                  >
                    {entity} Closed
                  </div>
                ) : isOwner ? (
                  <ActionDropdown
                    buttonClassname={'bg-white'}
                    className={'absolute right-2 top-3 768:static'}
                    options={[
                      {
                        icon: <Freeze />,
                        onClick() {
                          setAction(paused ? 'unpause' : 'pause');
                          setMode('authorize');
                        },
                        title: `${paused ? 'Unfreeze' : 'Freeze'} ${entity}`,
                      },
                      {
                        icon: <MiniLock />,
                        onClick: () => setAction('close'),
                        title: `Close ${entity}`,
                      },
                    ]}
                    id={'budget_actions'}
                  />
                ) : !isOwner && !paused ? (
                  <div className='mr-2'>
                    <MakeTransfer budget={budget} />
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
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
