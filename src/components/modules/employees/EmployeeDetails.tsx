import { Avatar } from 'components/commons/Avatar';
import { DisplayValue } from 'components/commons/DisplayValue';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { AppToast } from 'components/primary/AppToast';
import { EmployeeAction } from 'components/tables/employees/AllEmployeesTable/useColumns';
import { UserRoles } from 'enums/employee_enum';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useGetEmployeeById } from 'hooks/api/employees/useGetEmployeeById';
import { useResendInvite } from 'hooks/api/employees/useResendInvite';
import { Fragment } from 'react';
import { toast } from 'react-toastify';
import { formatDate } from 'utils/formatters/formatDate';

interface Props {
  id?: string;
  close: () => void;
  changeRole: (employee: IEmployee) => void;
  handleAction: (action: EmployeeAction, employee: IEmployee) => void;
}

export const EmployeeDetails = ({
  id,
  close,
  handleAction,
  changeRole,
}: Props) => {
  const { isLoading, isError, data } = useGetEmployeeById(id);

  const { isLoading: resending, mutate: resend } = useResendInvite(id, {
    onSuccess() {
      toast(<AppToast>Invite resent</AppToast>, { type: 'success' });
      close();
    },
  });

  if (isLoading) return <IsLoading />;

  if (isError)
    return <IsError description={'Failed to get employee details'} />;

  const { firstName, lastName, status, avatar, email, role, phone, createdAt } =
    data;

  const payload = [
    { title: 'Phone Number', value: phone },
    { title: 'Date Added', value: formatDate(createdAt, 'short') },
    { title: 'Role', value: UserRoles[role] },
  ];

  const isActive = status === 'active';

  return (
    <>
      <div className={'rounded-xl border border-neutral-310 p-5'}>
        <div className='flex gap-2 border-b border-neutral-310 pb-4'>
          <div className='y-center'>
            <Avatar avatar={avatar} size={42} />
          </div>

          <div className={'my-auto'}>
            <h5 className={'text-base font-medium'}>
              {firstName} {lastName}
            </h5>

            <div className={'text-sm text-neutral-500'}>{email}</div>
          </div>
        </div>

        {payload.map(({ value, title }) => {
          if (!value) return <Fragment key={title} />;

          return (
            <DisplayValue
              normal
              className={'mt-5'}
              key={title}
              {...{ value, title }}
            />
          );
        })}
      </div>

      <div className='mt-5 flex gap-3'>
        <button
          className={'primary-button min-w-[120px]'}
          onClick={() =>
            isActive ? changeRole(data) : handleAction('delete_invite', data)
          }
          type={'button'}
        >
          {isActive ? 'Change Role' : 'Delete Invite'}
        </button>

        <SubmitButton
          className={'secondary-button min-w-[120px]'}
          submitting={resending}
          type={'button'}
          onClick={() =>
            isActive ? handleAction('remove_user', data) : resend(null)
          }
        >
          {isActive ? 'Remove User' : 'Resend Invite'}
        </SubmitButton>
      </div>
    </>
  );
};
