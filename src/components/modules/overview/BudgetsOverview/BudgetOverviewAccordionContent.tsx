import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { PendingBudgetCard } from 'components/modules/budgeting/PendingBudgetCard';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { GetColorByChar } from 'hooks/commons/useGetColorByChar';
import { Fragment } from 'react';
import { formatAmount } from 'utils/formatters/formatAmount';
import { formatDate } from 'utils/formatters/formatDate';
import { handleSort } from 'utils/handlers/handleSort';

export const BudgetOverviewAccordionContent = ({
  getColor,
  currentTab,
  ...budget
}: IBudget & { currentTab?: string; getColor: GetColorByChar }) => {
  const { amount, balance, beneficiaries, status, currency, expiry } = budget;

  if (currentTab === 'pending')
    return <PendingBudgetCard {...budget} stripDown />;

  const payload = [
    {
      label: 'Total Budget',
      value: amount,
    },
    {
      label: 'Available',
      value: balance,
    },
    {
      label: 'Spent',
      value: amount - balance,
    },
    {
      label: 'Due Date',
      value: expiry ? formatDate(expiry, 'short', true) : null,
    },
    {
      label: 'Status',
      value: (
        <span
          className={clsx(
            status === 'active'
              ? 'pill_green'
              : status === 'closed'
              ? 'pill_red'
              : 'pill_gray'
          )}
        >
          {status}
        </span>
      ),
    },
    {
      label: 'Beneficiaries',
      value: (
        <>
          <div className={clsx('relative flex h-7 w-full')}>
            {handleSort({
              data: beneficiaries.slice(0, 5),
              sortBy: 'email',
            })?.map(({ email, avatar }, i) => {
              return (
                <div
                  key={email}
                  className={clsx('absolute bottom-0 z-10 flex gap-2')}
                  style={{
                    zIndex: 10 + i,
                    right: 22 * i,
                  }}
                >
                  <Avatar
                    avatar={avatar}
                    getBackgroundColor={() => getColor(email?.charAt(0))}
                    className={clsx('my-auto ring-2 ring-white')}
                    size={28}
                    key={email}
                    initials={email.charAt(0)}
                  />
                </div>
              );
            })}
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      {payload?.map(({ label, value }) => {
        if (!value) return <Fragment key={label} />;

        return (
          <div key={label} className={'x-between my-2 h-7'}>
            <div className={'my-auto text-sm text-neutral-600'}>{label}</div>
            <div className={'relative my-auto text-sm text-black'}>
              {typeof value === 'number' ? (
                <span className={'flex gap-0.5'}>
                  <span className={'my-auto text-[10px]'}>{currency}</span>
                  <span className={'my-auto'}>
                    {formatAmount({
                      value: value / 100,
                    })}
                  </span>
                </span>
              ) : (
                value
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
