import { CreateBudgetDto } from 'hooks/api/budgeting/useCreateBudget';
import { formatAmount } from 'utils/formatters/formatAmount';
import { formatDate } from 'utils/formatters/formatDate';

export type SubBudgetListItem = Omit<CreateBudgetDto, 'pin'> & {
  id: string;
};

interface Props {
  subBudgets: SubBudgetListItem[];
  currency?: string;
}

export const SubBudgetsList = ({ subBudgets, currency }: Props) => {
  return (
    <>
      {subBudgets.map(({ id, name, amount, expiry }) => {
        return (
          <div
            className={
              'card x-between mb-5 h-[92px] border-neutral-200 p-3 640:p-5'
            }
            key={id}
          >
            <div className={'y-between'}>
              <div className={'text-base font-medium text-neutral-1000'}>
                {name}
              </div>
              <p className={'text-sm text-neutral-500'}>
                {!!expiry ? (
                  <span>
                    Due Date: {formatDate(expiry.toISOString(), 'short', true)}
                  </span>
                ) : null}
              </p>
            </div>

            <div className='y-between h-full text-right'>
              <p className={'text-sm text-neutral-500'}>Budget Allocation</p>

              <div className={'-mb-0.5 flex gap-2 text-[20px] font-medium'}>
                {currency}
                {formatAmount({
                  value: amount / 100,
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
