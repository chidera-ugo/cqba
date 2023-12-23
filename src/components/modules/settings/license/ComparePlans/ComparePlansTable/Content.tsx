import clsx from 'clsx';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { getPlansRows } from 'components/modules/settings/license/ComparePlans/getPlansRow';
import { PlansTableCell } from 'components/modules/settings/license/ComparePlans/PlansTableCell';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';
import { SubscriptionPlan } from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { Fragment } from 'react';
import { generatePlaceholderArray } from 'utils/generators/generatePlaceholderArray';
import { Props } from '.';

export const Content = ({
  planId,
  choosePlan,
  titleClassname,
  data: _data,
  currentTab,
  showOnlyPaidPlans,
}: Omit<Props, 'className'> & {
  data?: SubscriptionPlan[];
  currentTab?: string;
}) => {
  const {
    data: activePlan,
    isLoading: gettingActivePlan,
    isRefetching: refetching,
  } = useGetActiveSubscription();

  const data = _data?.filter(({ amount, _id }) => {
    if (currentTab) return _id === currentTab;
    if (planId) return _id === planId;
    if (showOnlyPaidPlans) return amount.NGN > 0;
    return true;
  });

  const tableHeaderValues = [
    {
      name: '',
      code: '',
    },
    ...(data?.map(({ name, code }) => ({
      name,
      code,
    })) ?? []),
  ];

  function getPlanCode(index: number) {
    return tableHeaderValues[index]!.code;
  }

  const rows = getPlansRows(data);

  return (
    <div className={'rounded-2xl border border-neutral-200'}>
      <table className='w-full table-auto overflow-hidden rounded-2xl text-left text-sm 640:min-w-[640px]'>
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
                  <tr>
                    {[
                      group,
                      ...generatePlaceholderArray(
                        tableHeaderValues.length - 1,
                        true
                      ),
                    ]?.map((title) => {
                      return (
                        <td
                          key={title}
                          className={clsx(
                            'h-[71px] bg-neutral-100 px-5 text-left text-base font-medium capitalize text-neutral-1000'
                          )}
                        >
                          {typeof title !== 'number'
                            ? title.replace('_', ' ')
                            : ''}
                        </td>
                      );
                    })}
                  </tr>
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
        </tbody>

        {choosePlan && (
          <tfoot className={clsx('h-24 text-neutral-400')}>
            <td scope='row' className='max-w-[220px] bg-white py-4 px-5'></td>

            {data?.map(({ amount, mostPopular, _id }, i) => {
              const isActive = _id === activePlan?.plan?._id;

              return (
                <td
                  key={_id}
                  className='table_border bg-white px-3 text-center font-semibold text-neutral-800'
                >
                  <SubmitButton
                    submitting={gettingActivePlan || refetching}
                    type={'button'}
                    onClick={() =>
                      isActive ? null : choosePlan(getPlanCode(i + 1))
                    }
                    className={clsx(
                      'mx-auto block min-w-[140px] px-2 text-xs 640:min-w-[180px] 640:text-sm',
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
          </tfoot>
        )}
      </table>
    </div>
  );
};
