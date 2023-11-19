import { Bin, Edit } from 'components/svgs/Icons_TableActions';

interface Props {
  handleActionClick: (action: EmployeeAction) => void;
}

export type EmployeeAction = 'delete' | 'edit' | 'block' | 'unblock' | null;

export const EmployeeActions = ({ handleActionClick }: Props) => {
  return (
    <div className={'flex gap-5'}>
      <button
        onClick={() => handleActionClick('edit')}
        type={'button'}
        className={'y-center cell-button p-1 text-primary-main'}
      >
        <Edit />
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
