import {
  Bin,
  OpenLock,
  ClosedLockOutline,
} from 'components/svgs/Icons_TableActions';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';

interface Props {
  employee: IEmployee;
  handleActionClick: (action: EmployeeAction) => void;
}

export type EmployeeAction = 'delete' | 'block' | 'unblock' | null;

export const EmployeeActions = ({ handleActionClick, employee }: Props) => {
  return (
    <div className={'flex gap-5'}>
      <button
        onClick={() =>
          handleActionClick(employee.status === 'blocked' ? 'unblock' : 'block')
        }
        type={'button'}
        className={'y-center cell-button p-1 text-primary-main'}
      >
        {employee.status === 'blocked' ? <ClosedLockOutline /> : <OpenLock />}
      </button>

      <button
        onClick={() => handleActionClick('delete')}
        type={'button'}
        className={'y-center cell-button p-1'}
      >
        <Bin />
      </button>
    </div>
  );
};
