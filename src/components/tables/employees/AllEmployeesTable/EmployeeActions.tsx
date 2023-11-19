import { Bin, Edit } from 'components/svgs/Icons_TableActions';

export type EmployeeAction = 'delete' | 'edit' | 'block' | 'unblock' | null;

interface Props {
  handleActionClick: (action: EmployeeAction) => void;
  isEmployeeActive: boolean;
}

export const EmployeeActions = ({
  handleActionClick,
  isEmployeeActive,
}: Props) => {
  return (
    <div className={'flex gap-5'}>
      {!isEmployeeActive && (
        <button
          onClick={() => handleActionClick('edit')}
          type={'button'}
          className={'y-center cell-button p-1 text-primary-main'}
        >
          <Edit />
        </button>
      )}

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
