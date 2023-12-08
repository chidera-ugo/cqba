import clsx from 'clsx';
import { getPlansRows } from 'components/modules/subscriptions/ComparePlans/getPlansRow';
import { PlansTableCell } from 'components/modules/subscriptions/ComparePlans/PlansTableCell';
import { useGetAllSubscriptionPlans } from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { generatePlaceholderArray } from 'utils/generators/generatePlaceholderArray';

interface Props {
  className?: string;
  choosePlan?: (planCode: string) => void;
  showOnlyPaidPlans?: boolean;
  planId?: string;
  titleClassname?: string;
}

export const ComparePlansTable = ({
  className,
  showOnlyPaidPlans,
  choosePlan,
  planId,
  titleClassname,
}: Props) => {
  const { isLoading, isError, data: _data } = useGetAllSubscriptionPlans();

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError className={'py-16'} />;

  const data = _data?.filter(({ amount, _id }) => {
    if (planId) return _id === planId;
    if (showOnlyPaidPlans) return amount.NGN > 0;
    return true;
  });

  const tableHeaderValues = [
    {
      name: '',
      code: '',
    },
    ...data.map(({ name, code }) => ({
      name,
      code,
    })),
  ];

  function getPlanCode(index: number) {
    return tableHeaderValues[index]!.code;
  }

  return (
    <div className={clsx('mx-auto w-full overflow-x-auto', className)}>
      <div className={'rounded-xl border border-neutral-200 640:rounded-2xl'}>
        <table className='w-full min-w-[640px] overflow-hidden rounded-2xl text-left text-sm'>
          {!!planId ? (
            <thead>
              <tr>
                {['Features', '']?.map((title) => {
                  return (
                    <th
                      key={title}
                      className={clsx(
                        'h-14 bg-neutral-100 px-5 text-left text-sm font-medium text-primary-main'
                      )}
                    >
                      {title}
                    </th>
                  );
                })}
              </tr>
            </thead>
          ) : (
            <thead>
              <tr>
                {tableHeaderValues?.map(({ name: title, code }) => {
                  return (
                    <th
                      key={code}
                      className={clsx(
                        'h-[70px] bg-neutral-100 text-center text-lg font-medium text-black'
                      )}
                    >
                      {title}
                    </th>
                  );
                })}
              </tr>
            </thead>
          )}

          <tbody>
            {getPlansRows(data)?.map(({ name: title, description, plans }) => {
              return (
                <tr
                  key={title}
                  title={title}
                  className={clsx(
                    'border-b border-neutral-100 text-neutral-400'
                  )}
                >
                  <td scope='row' className='max-w-[220px] bg-white py-4 px-5'>
                    <div
                      className={clsx(
                        'text-base font-semibold leading-5',
                        titleClassname ?? 'text-neutral-1000'
                      )}
                    >
                      {title}
                    </div>
                    {description && (
                      <p className={'mt-1 text-sm'}>{description}</p>
                    )}
                  </td>

                  {generatePlaceholderArray(tableHeaderValues.length - 1).map(
                    (key, i) => {
                      return (
                        <td
                          key={key}
                          className='table_border bg-white px-5 text-center font-semibold text-neutral-800'
                        >
                          <div className='x-center'>
                            <PlansTableCell
                              plan={plans?.[getPlanCode(i + 1)]}
                            />
                          </div>
                        </td>
                      );
                    }
                  )}
                </tr>
              );
            })}

            {choosePlan && (
              <tr className={clsx('h-24 text-neutral-400')}>
                <td
                  scope='row'
                  className='max-w-[220px] bg-white py-4 px-5'
                ></td>

                {[
                  { type: 'secondary-button', isFree: true },
                  { type: 'primary-button' },
                  { type: 'dark-button' },
                ]
                  .slice(showOnlyPaidPlans ? 1 : 0, 3)
                  .map(({ type, isFree }, i) => {
                    return (
                      <td
                        key={type}
                        className='table_border bg-white px-5 text-center font-semibold text-neutral-800'
                      >
                        <button
                          type={'button'}
                          onClick={() => choosePlan(getPlanCode(i + 1))}
                          className={clsx(
                            type,
                            'mx-auto block min-w-[180px] flex-shrink-0'
                          )}
                        >
                          Get Started{isFree && ` For Free`}
                        </button>
                      </td>
                    );
                  })}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
