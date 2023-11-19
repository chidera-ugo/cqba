import { useQueryClient } from '@tanstack/react-query';
import { Avatar } from 'components/common/Avatar';
import { DisplayValue } from 'components/common/DisplayValue';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Confirmation } from 'components/modals/Confirmation';
import { AppToast } from 'components/primary/AppToast';
import { useDeleteEmployee } from 'hooks/api/employees/useDeleteEmployee';
import { useDeleteInvite } from 'hooks/api/employees/useDeleteInvite';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useGetEmployeeById } from 'hooks/api/employees/useGetEmployeeById';
import { useResendInvite } from 'hooks/api/employees/useResendInvite';
import { useGetColorByChar } from 'hooks/common/useGetColorByChar';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { formatDate } from 'utils/formatters/formatDate';

interface Props {
  id?: string;
  close: () => void;
  changeRole: (employee: IEmployee) => void;
}

export const EmployeeDetails = ({ id, close, changeRole }: Props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useGetEmployeeById(id);

  const { isLoading: deleting, mutate: deleteInvite } = useDeleteInvite(id, {
    onSuccess() {
      queryClient.invalidateQueries(['employees']);
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
        queryClient.invalidateQueries(['employees']);
        close();
      },
    });

  const { getColor } = useGetColorByChar();

  if (isLoading) return <IsLoading />;

  if (isError)
    return <IsError description={'Failed to get employee details'} />;

  const { firstName, lastName, status, email, role, createdAt } = data;

  const char = firstName.charAt(0);

  const payload = [
    { title: 'Email', value: email },
    { title: 'Date Added', value: formatDate(createdAt, 'short') },
    { title: 'Role', value: role },
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
          <Avatar getBackgroundColor={() => getColor(char)} {...{ char }} />

          <h5 className={'my-auto text-lg'}>
            {data?.firstName} {data?.lastName}
          </h5>
        </div>

        {payload.map(({ value, title }) => {
          return (
            <DisplayValue
              normal
              className={'mt-4'}
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
