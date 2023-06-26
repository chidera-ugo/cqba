import { DisplayValue } from 'components/common/DisplayValue';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';

interface Props {
  budget: IBudget;
}

export const ApprovedBudgetDetails = ({ budget }: Props) => {
  const { title, description, departmentId } = budget;

  const { isLoading, isError, data } = useMakeDummyHttpRequest({
    method: 'get',
    res: {
      bankName: 'Access Bank',
      accountNumber: '18488104894',
      accountBalance: 104844,
      transactionCount: 1303,
    },
  });

  if (isLoading) return <IsLoading />;
  if (isError || !data)
    return (
      <IsError
        title='An error occurred'
        description='Failed to get budget details'
      />
    );

  const overviewTopRow: { title: string; value?: string }[] = [
    {
      title: 'Account Holder',
      value: title,
    },
    {
      title: 'Email Address',
      value: description,
    },
    {
      title: 'Department',
      value: departmentId,
    },
  ];

  const accountInformation: {
    title: string;
    value?: string | number;
    isAmount?: boolean;
    disableFormatting?: boolean;
  }[] = [
    {
      title: data.bankName,
      value: data.accountNumber,
    },
    {
      title: 'Account Balance',
      value: data.accountBalance,
      isAmount: true,
    },
    {
      title: 'Transaction Count',
      value: data.transactionCount,
      isAmount: true,
      disableFormatting: true,
    },
  ];

  return (
    <>
      <div className='card'>
        <div className='grid grid-cols-12'>
          {overviewTopRow.map(({ title, value }) => {
            return (
              <DisplayValue
                className='col-span-4'
                key={title}
                smallText
                {...{ title, value }}
              />
            );
          })}
        </div>

        <div className='mt-6 grid grid-cols-12 border-t border-neutral-200 pt-5'>
          {accountInformation.map(
            ({ title, isAmount, disableFormatting, value }) => {
              return (
                <DisplayValue
                  className='col-span-4'
                  key={title}
                  {...{ title, isAmount, disableFormatting, value }}
                />
              );
            }
          )}
        </div>
      </div>
    </>
  );
};
