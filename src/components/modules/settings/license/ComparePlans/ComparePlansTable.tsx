import clsx from 'clsx';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { getPlansRows } from 'components/modules/settings/license/ComparePlans/getPlansRow';
import { PlansTableCell } from 'components/modules/settings/license/ComparePlans/PlansTableCell';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';
import { useGetAllSubscriptionPlans } from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { Fragment } from 'react';
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
  const {
    data: activePlan,
    isLoading: gettingActivePlan,
    isRefetching: refetching,
  } = useGetActiveSubscription();

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

  const rows = getPlansRows(data);

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
            {Object.keys(rows)?.map((group) => {
              return (
                <Fragment key={group}>
                  {!!group && (
                    <>
                      {[
                        group,
                        ...generatePlaceholderArray(
                          tableHeaderValues.length - 1,
                          true
                        ),
                      ]?.map((title) => {
                        return (
                          <th
                            key={title}
                            className={clsx(
                              'h-[71px] bg-neutral-100 px-5 text-left text-base font-medium capitalize text-neutral-1000'
                            )}
                          >
                            {typeof title !== 'number'
                              ? title.replace('_', ' ')
                              : ''}
                          </th>
                        );
                      })}
                    </>
                  )}

                  {rows[group]?.map(({ name: title, description, plans }) => {
                    return (
                      <tr
                        key={title}
                        title={title}
                        className={clsx(
                          'border-b border-neutral-100 text-neutral-400'
                        )}
                      >
                        <td
                          scope='row'
                          className='max-w-[220px] bg-white py-6 px-5'
                        >
                          <div
                            className={clsx(
                              'text-base font-medium leading-5',
                              titleClassname ?? 'text-neutral-1000'
                            )}
                          >
                            {title}
                          </div>
                          {description && (
                            <p className={'mt-1 text-sm'}>{description}</p>
                          )}
                        </td>

                        {generatePlaceholderArray(
                          tableHeaderValues.length - 1
                        ).map((key, i) => {
                          return (
                            <td
                              key={key}
                              className='table_border bg-white px-5 text-center text-base font-medium text-neutral-800'
                            >
                              <div className='x-center'>
                                <PlansTableCell
                                  plan={plans?.[getPlanCode(i + 1)]}
                                />
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </Fragment>
              );
            })}

            {choosePlan && (
              <tr className={clsx('h-24 text-neutral-400')}>
                <td
                  scope='row'
                  className='max-w-[220px] bg-white py-4 px-5'
                ></td>

                {data?.map(({ amount, mostPopular, _id }, i) => {
                  const isActive = _id === activePlan?.plan?._id;

                  return (
                    <td
                      key={_id}
                      className='table_border bg-white px-5 text-center font-semibold text-neutral-800'
                    >
                      <SubmitButton
                        submitting={gettingActivePlan || refetching}
                        type={'button'}
                        onClick={() =>
                          isActive ? null : choosePlan(getPlanCode(i + 1))
                        }
                        className={clsx(
                          'mx-auto block min-w-[180px] flex-shrink-0',
                          amount.NGN > 0
                            ? !mostPopular
                              ? 'dark-button'
                              : 'primary-button'
                            : 'secondary-button'
                        )}
                      >
                        {isActive
                          ? 'Current Plan'
                          : `Get Started${amount.NGN === 0 ? ` For Free` : ''}`}
                      </SubmitButton>
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
