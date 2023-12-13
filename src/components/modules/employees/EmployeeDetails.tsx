import { Avatar } from 'components/commons/Avatar';
import { DisplayValue } from 'components/commons/DisplayValue';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Confirmation } from 'components/modals/Confirmation';
import { AppToast } from 'components/primary/AppToast';
import { UserRoles } from 'enums/employee_enum';
import { useDeleteEmployee } from 'hooks/api/employees/useDeleteEmployee';
import { useDeleteInvite } from 'hooks/api/employees/useDeleteInvite';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useGetEmployeeById } from 'hooks/api/employees/useGetEmployeeById';
import { useResendInvite } from 'hooks/api/employees/useResendInvite';
import { useQueryInvalidator } from 'hooks/app/useQueryInvalidator';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { formatDate } from 'utils/formatters/formatDate';

interface Props {
  id?: string;
  close: () => void;
  changeRole: (employee: IEmployee) => void;
  currentEmployee: IEmployee | null;
}

export const EmployeeDetails = ({
  id,
  currentEmployee,
  close,
  changeRole,
}: Props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { invalidate } = useQueryInvalidator();

  const { isLoading, isError, data: _data } = useGetEmployeeById(id);

  const { isLoading: deleting, mutate: deleteInvite } = useDeleteInvite(id, {
    onSuccess() {
      invalidate('team');
      close();
    },
  });

  const { isLoading: resending, mutate: resend } = useResendInvite(id, {
    onSuccess() {
      toast(<AppToast>Invite resent</AppToast>, { type: 'success' });
      close();
    },
  });

  const { mutate: deleteEmployee, isLoading: deletingEmployee } =
    useDeleteEmployee(id, {
      onSuccess() {
        invalidate('team');
        close();
      },
    });

  if (isLoading && !currentEmployee) return <IsLoading />;

  if (isError && !currentEmployee)
    return <IsError description={'Failed to get employee details'} />;

  const data = !!currentEmployee ? currentEmployee : _data!;

  const { firstName, lastName, status, email, role, phone, createdAt } = data;

  const payload = [
    { title: 'Phone Number', value: phone },
    { title: 'Date Added', value: formatDate(createdAt, 'short') },
    { title: 'Role', value: UserRoles[role] },
  ];

  const isActive = status === 'active';

  return (
    <>
      <Confirmation
        type={'right'}
        show={showConfirmation}
        hideBackground
        title={isActive ? 'Remove team member' : 'Delete invite'}
        subTitle={`This means ${firstName} ${lastName} will no longer be able to ${
          isActive ? 'access your dashboard' : 'join your organization'
        }`}
        positive={() => (isActive ? deleteEmployee(null) : deleteInvite(null))}
        buttonTexts={[isActive ? 'Remove User' : 'Delete Invite']}
        processing={deleting || deletingEmployee}
        negative={() => setShowConfirmation(false)}
      />

      <div className={'rounded-xl border border-neutral-310 p-5'}>
        <div className='flex gap-2 border-b border-neutral-310 pb-4'>
          <div className='y-center'>
            <Avatar size={42} />
          </div>

          <div className={'my-auto'}>
            <h5 className={'text-base font-medium'}>
              {firstName} {lastName}
            </h5>

            <div className={'text-sm text-neutral-500'}>{email}</div>
          </div>
        </div>

        {payload.map(({ value, title }) => {
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
            isActive ? changeRole(data) : setShowConfirmation(true)
          }
          type={'button'}
        >
          {isActive ? 'Change Role' : 'Delete Invite'}
        </button>

        <SubmitButton
          className={'secondary-button min-w-[120px]'}
          submitting={resending}
          type={'button'}
          onClick={() => (isActive ? setShowConfirmation(true) : resend(null))}
        >
          {isActive ? 'Remove User' : 'Resend Invite'}
        </SubmitButton>
      </div>
    </>
  );
};
