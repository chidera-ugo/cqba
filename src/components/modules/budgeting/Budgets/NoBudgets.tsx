import { NoData } from 'components/core/Table/NoData';
import budgeting from '/public/mockups/budgeting.jpg';

export const NoBudgets = ({
  processing,
  type,
}: {
  processing: boolean;
  type: string;
}) => {
  return (
    <NoData
      processing={processing}
      imageSrc={budgeting}
      type={type}
      title={type === 'approvals' ? 'No Pending Approvals' : 'Create Budget'}
      toastClassname={'bottom-24'}
      subTitle={
        type === 'approvals'
          ? `You don't have any active approvals. All approved budget request will appear here`
          : `Creating a budget is the first step to financial success. Define your spending limits and allocate resources strategically to achieve your business goals`
      }
    />
  );
};
