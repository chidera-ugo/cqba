import clsx from 'clsx';
import { SimpleDisplayValue } from 'components/common/SimpleDisplayValue';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { ManageSubAccount } from 'components/modules/sub-accounts/ManageSubAccount';
import { AllSubAccountsTable } from 'components/tables/sub-accounts/AllSubAccountsTable';
import { useGetDepartmentById } from 'hooks/api/departments/useGetDepartmentById';
import { useManageSubAccount } from 'hooks/sub-accounts/useManageSubAccount';
import { useRouter } from 'next/router';
import { getValidQueryParam } from 'utils/getters/getValidQueryParam';

export const SubAccountsDepartmentInformation = () => {
  const { query } = useRouter();
  const id = getValidQueryParam(query['id']);

  const { setAccountToEdit, setModal, ...rest } = useManageSubAccount();

  const { isLoading, isError, data } = useGetDepartmentById(id, {
    enabled: !!id,
  });

  if (isLoading) return <IsLoading />;

  if (isError)
    return <IsError description={'Failed to get account information'} />;

  const { title } = data;

  const payload: {
    name: string;
    value: string | number;
    isAmount?: boolean;
    disabled?: boolean;
  }[] = [
    {
      name: 'Account Balance',
      value: 0,
      isAmount: true,
    },
    {
      name: 'Department',
      value: title,
    },
    {
      name: 'No of Employees',
      value: 0,
    },
  ];

  return (
    <>
      <div className='grid grid-cols-12 rounded-xl border border-neutral-200'>
        {payload.map((item, i) => {
          return (
            <SimpleDisplayValue
              key={item.name}
              className={clsx(
                'col-span-12 px-5 640:col-span-6 1180:col-span-4',
                i > 0 && 'b-5 border-neutral-200 1180:border-l',
                i === 0 ? 'my-5' : 'mb-5 640:mt-5'
              )}
              {...item}
            />
          );
        })}
      </div>

      <ManageSubAccount {...rest} {...{ setAccountToEdit, setModal }} />

      <div className='mt-5'>
        <AllSubAccountsTable
          fromSubAccountDepartments
          departmentId={data?.id}
          onClickEditAccount={(account) => {
            setAccountToEdit(account);
            setModal('create');
          }}
        />
      </div>
    </>
  );
};
