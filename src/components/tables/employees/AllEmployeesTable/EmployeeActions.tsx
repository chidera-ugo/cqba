import { Bin, OpenLock } from 'components/svgs/Icons_TableActions';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';

interface Props {
  employee: IEmployee;
  handleActionClick: (action: EmployeeAction) => void;
}

export type EmployeeAction = 'delete' | 'block' | null;

export const EmployeeActions = ({ handleActionClick }: Props) => {
  return (
    <div className={'flex gap-5'}>
      <button
        onClick={() => handleActionClick('block')}
        type={'button'}
        className={'y-center cell-button p-1'}
      >
        <OpenLock />
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
