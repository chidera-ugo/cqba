import { ProfileCard } from 'components/common/ProfileCard';
import { BudgetAction } from 'components/modules/budgeting/BudgetAction';
import { IBudget } from 'types/budgeting/Budget';

export const BudgetCard = ({ id, employee }: IBudget) => {
  return (
    <button
      type='button'
      className='card col-span-4 transition-colors hover:border-primary-main'
      key={id}
    >
      <div className='x-between'>
        <ProfileCard
          title={employee.fullName}
          subTitle={employee.department}
          avatar={employee.avatar}
        />

        <BudgetAction dropdownId={id} />
      </div>
    </button>
  );
};
