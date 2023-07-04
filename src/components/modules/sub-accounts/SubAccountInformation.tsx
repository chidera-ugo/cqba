import clsx from 'clsx';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { useGetSubAccountById } from 'hooks/api/sub-accounts/useGetSubAccountById';
import { useRouter } from 'next/router';
import { formatAmount } from 'utils/formatters/formatAmount';
import { generateUUID } from 'utils/generators/generateUUID';
import { getValidQueryParam } from 'utils/getters/getValidQueryParam';

export const SubAccountInformation = () => {
  const { query } = useRouter();
  const id = getValidQueryParam(query['id']);

  const { isLoading, isError, data } = useGetSubAccountById(id, {
    enabled: !!id,
  });

  if (isLoading) return <IsLoading />;

  if (isError)
    return <IsError description={'Failed to get account information'} />;

  const {
    accountHolderName,
    createdAt,
    updatedAt,
    accountHolderEmail,
    balance,
    departmentTitle,
  } = data;

  const payload: {
    name: string;
    value: string | number;
    isAmount?: boolean;
  }[][] = [
    [
      {
        name: 'Account Holder',
        value: accountHolderName,
      },
      {
        name: 'Access Bank PLC',
        value: createdAt,
      },
    ],
    [
      {
        name: 'Phone Number',
        value: updatedAt,
      },
      {
        name: 'Account Balance',
        value: balance,
        isAmount: true,
      },
    ],
    [
      {
        name: 'Email Address',
        value: accountHolderEmail,
      },
      {
        name: 'Transaction Count',
        value: 0,
      },
    ],
    [
      { name: 'Department', value: departmentTitle },
      { name: 'Budgets', value: 0 },
    ],
  ];

  return (
    <>
      <div className='grid grid-cols-12 rounded-xl border border-neutral-200'>
        {payload.map((pair, i) => {
          return (
            <div
              key={generateUUID()}
              className={clsx(
                'y-between col-span-12 mt-5 gap-3 px-5 640:col-span-6 640:gap-5 1340:col-span-3 1340:mb-5',
                i > 0 && 'border-neutral-200 1340:border-l'
              )}
            >
              {pair.map(({ name, value, isAmount }, i) => {
                return (
                  <div key={name}>
                    <div className='text-sm text-neutral-400'>{name}</div>

                    <div
                      className={clsx(
                        'mt-1 font-semibold text-neutral-1000',
                        i === 0 ? 'text-lg' : 'text-[28px]'
                      )}
                    >
                      {isAmount
                        ? `₦${formatAmount({
                            value,
                            kFormatter: Number(value) > 9999999,
                            decimalPlaces: 2,
                          })}`
                        : value ?? '---'}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
