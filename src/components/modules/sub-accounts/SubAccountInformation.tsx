import clsx from 'clsx';
import { SimpleDisplayValue } from 'components/common/SimpleDisplayValue';
import { ISubAccount } from 'hooks/api/sub-accounts/useGetAllSubAccounts';
import { generateUUID } from 'utils/generators/generateUUID';

export const SubAccountInformation = ({ data }: { data: ISubAccount }) => {
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
              {pair.map((item, i) => {
                return (
                  <SimpleDisplayValue
                    key={item.name}
                    valueClassName={i === 0 ? 'text-lg' : 'text-[28px]'}
                    {...item}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
