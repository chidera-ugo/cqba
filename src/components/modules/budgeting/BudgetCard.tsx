import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { ProfileCard } from 'components/common/ProfileCard';
import {
  TableAction,
  TableActionItem,
} from 'components/core/Table/TableAction';
import { CategoryPill } from 'components/modules/categories/DefaultCategories';
import { AppToast } from 'components/primary/AppToast';
import { Lock, Pause } from 'components/svgs/budgeting/Budget_Icons';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { CircleThreeDots } from 'components/svgs/Icons_TableActions';
import { useCloseBudget } from 'hooks/api/budgeting/useCloseBudget';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { usePauseBudget } from 'hooks/api/budgeting/usePauseBudget';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { formatAmount } from 'utils/formatters/formatAmount';
import { formatDate } from 'utils/formatters/formatDate';

export const BudgetCard = ({
  onItemClick,
  showFullDetails,
  getColor,
  className,
  ...budget
}: IBudget & {
  showFullDetails?: boolean;
  onItemClick?: (res: any) => void;
  getColor: (char: string) => string;
  className?: string;
}) => {
  const queryClient = useQueryClient();

  const [showDropdown, setShowDropdown] = useState(false);

  const { mutate: pause, isLoading: pausing } = usePauseBudget(budget.id, {
    onSuccess: () => onSuccess('Paused'),
  });

  const { mutate: close, isLoading: closing } = useCloseBudget(budget.id, {
    onSuccess: () => onSuccess('Closed'),
  });

  const {
    id,
    description,
    creator,
    deadline,
    departmentTitle,
    title,
    status,
    amount,
    categoryTitle,
    createdAt,
  } = budget;

  const budgetIsActive = status !== 'open' && status !== 'declined';

  const actions: TableActionItem[] = [
    {
      title: 'Pause Budget',
      icon: <Pause />,
      onClick: () => {
        setShowDropdown(false);
        pause({});
      },
    },
    {
      title: 'Close Budget',
      icon: <Lock />,
      onClick: () => {
        setShowDropdown(false);
        close({});
      },
    },
  ];

  function handleClick() {
    if (showDropdown) return;
    if (showFullDetails || !onItemClick) return;
    onItemClick(budget);
  }

  function onSuccess(action: string) {
    toast(<AppToast>{action} budget successfully</AppToast>, {
      type: 'success',
    });

    queryClient.invalidateQueries(['budgets']);
  }

  return (
    <div
      className={clsx(
        className,
        'card y-between p-0 transition-colors',
        status !== 'declined' &&
          !showFullDetails &&
          'cursor-pointer hover:ring-4 hover:ring-primary-main hover:ring-opacity-20'
      )}
      key={id}
    >
      <div className={clsx('x-between')}>
        <div className='w-full p-3 pb-2 640:p-5 640:pb-4' onClick={handleClick}>
          <ProfileCard
            getBackgroundColor={getColor}
            title={`${creator?.firstName} ${creator?.lastName}`}
            subTitle={`${departmentTitle} Department`}
          />
        </div>

        {budgetIsActive ? (
          <div className={'y-center'}>
            <div className='h-[28px]' onClick={handleClick}></div>
            <BudgetAction
              {...{ actions }}
              id={budget.id}
              processing={pausing || closing}
              externalShowDropdown={showDropdown}
              externalSetShowDropdown={setShowDropdown}
            />
            <div onClick={handleClick} className='h-full'></div>
          </div>
        ) : null}
      </div>

      <div className={'h-full p-3 pt-0 640:p-5 640:pt-0'} onClick={handleClick}>
        <div className='text-left'>
          <h4 className='text-lg'>{title}</h4>
          <p
            className={clsx(
              'mt-1 text-sm font-normal leading-6 text-neutral-500',
              !showFullDetails && 'line-clamp-2'
            )}
          >
            {status === 'approved'
              ? `Approved by Admin - ${formatDate(deadline, 'short')}`
              : description}
          </p>
        </div>
      </div>

      <div className={'p-3 pt-0 640:p-5 640:pt-0'} onClick={handleClick}>
        <div className='x-between'>
          <div className={clsx('flex gap-3')}>
            <div className='y-center'>
              <CategoryPill
                {...{
                  getColor,
                }}
                category={categoryTitle}
              />
            </div>

            <div className='my-auto text-sm font-medium text-neutral-500'>
              {formatDate(createdAt, 'short')}
            </div>
          </div>
        </div>

        {status === 'open' && (
          <div
            className={clsx(
              'text-left font-semibold text-neutral-1000',
              showFullDetails ? 'mt-4 text-3xl' : 'mt-3 text-2xl'
            )}
          >
            ₦
            {formatAmount({
              value: amount,
              decimalPlaces: 2,
              kFormatter: Number(amount) > 9999999999,
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export const BudgetAction = ({
  actions,
  externalShowDropdown,
  externalSetShowDropdown,
  processing,
  id,
}: {
  id: string;
  actions: TableActionItem[];
  processing?: boolean;
  externalShowDropdown?: boolean;
  externalSetShowDropdown?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <TableAction
      options={actions}
      {...{
        externalShowDropdown,
        externalSetShowDropdown,
      }}
      id={`budget-card-table-action-${id}`}
      className={'mr-0 h-[48px] w-[48px]'}
      dropdownClassname={'right-4'}
      marginClassname={'-mt-0'}
      wrapperClassname={'h-full w-full'}
      icon={
        <span className={'x-center'}>
          {processing ? (
            <Spinner className={'text-primary-main'} />
          ) : (
            <CircleThreeDots />
          )}
        </span>
      }
    />
  );
};
