import { PaginationState } from '@tanstack/react-table';
import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { SimpleToast } from 'components/commons/SimpleToast';
import { Pagination as TablePagination } from 'components/core/Table/Pagination';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { RightChevron } from 'components/svgs/navigation/Chevrons';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { EmployeeModalType } from 'hooks/employees/useManageEmployee';
import { Dispatch, SetStateAction } from 'react';
import { PaginatedResponse } from 'types/Table';

interface Props {
  data?: PaginatedResponse<IEmployee>;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  fetching?: boolean;
  onRowClick: (employee: IEmployee, action: EmployeeModalType) => void;
}

export const MobileEmployeesList = ({
  data,
  pagination,
  setPagination,
  fetching,
  onRowClick,
}: Props) => {
  const { getColor } = useGetColorByChar();

  return (
    <div className={'card relative mt-5 rounded-xl p-0 640:mt-0'}>
      <SimpleToast
        show={!!fetching && !!data?.docs?.length}
        className='bottom-32 left-0 1180:left-[122px]'
      >
        <div className='flex py-2'>
          <Spinner className='my-auto mr-1 h-4 text-white' />
          <span className='my-auto'>Fetching</span>
        </div>
      </SimpleToast>

      <div className={'x-between py-2 px-3'}>
        <h4 className={'text-[10px] font-normal uppercase text-neutral-500'}>
          Employees
        </h4>
      </div>

      {data?.docs?.map((employee, i) => {
        const { firstName, lastName, email, _id } = employee;

        const char = firstName.charAt(0);

        return (
          <button
            key={_id}
            type={'button'}
            className={clsx(
              `x-between h-[60px] w-full gap-3 border-b border-gray-100 px-3 text-sm`,
              i % 2 === 0 && 'bg-neutral-100'
            )}
            onClick={() => onRowClick(employee, 'view_employee')}
          >
            <div className={'my-auto flex gap-2 text-left'}>
              <Avatar
                size={42}
                getBackgroundColor={() => getColor(char)}
                {...{ char }}
              />

              <div className='my-auto'>
                <h4 className={'break-all text-sm line-clamp-1'}>
                  {firstName} {lastName}
                </h4>
                <p
                  className={'break-all text-xs text-neutral-500 line-clamp-1'}
                >
                  {email}
                </p>
              </div>
            </div>

            <div className={'my-auto w-fit'}>
              <RightChevron />
            </div>
          </button>
        );
      })}

      {pagination &&
        data?.docs?.length &&
        (pagination?.pageIndex > 0 ||
          (pagination?.pageIndex === 0 &&
            data?.docs?.length === pagination?.pageSize)) && (
          <TablePagination
            {...{
              setPagination,
              pagination,
              fetching,
              ...data,
            }}
          />
        )}
    </div>
  );
};
