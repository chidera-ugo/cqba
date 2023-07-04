import clsx from 'clsx';
import { SimpleDisplayValue } from 'components/common/SimpleDisplayValue';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { ManageEmployee } from 'components/modules/employees/ManageEmployee';
import { AllEmployeesTable } from 'components/tables/employees/AllEmployeesTable';
import { useGetDepartmentById } from 'hooks/api/departments/useGetDepartmentById';
import { useManageEmployee } from 'hooks/employees/useManageEmployee';
import { useRouter } from 'next/router';
import { getValidQueryParam } from 'utils/getters/getValidQueryParam';

export const EmployeesDepartmentInformation = () => {
  const { query } = useRouter();
  const id = getValidQueryParam(query['id']);

  const { currentEmployee, setCurrentEmployee, setModal, ...rest } =
    useManageEmployee();

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
                'col-span-12 px-5 640:col-span-6',
                i > 0 && 'b-5 border-neutral-200 1180:border-l',
                i === 0 ? 'my-5' : 'mb-5 640:mt-5'
              )}
              {...item}
            />
          );
        })}
      </div>

      <ManageEmployee
        {...rest}
        {...{
          setCurrentEmployee,
          setModal,
          currentEmployee,
        }}
      />

      <div className='mt-5'>
        <AllEmployeesTable
          {...{
            onRowClick(employee) {
              setCurrentEmployee(employee);
              setModal('employee');
            },
            currentEmployee,
          }}
        />
      </div>
    </>
  );
};
