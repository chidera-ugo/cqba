import { NoData } from 'components/core/Table/NoData';
import budgeting from '/public/mockups/budgeting.jpg';

export const NoBudgets = ({ processing }: { processing: boolean }) => {
  return (
    <NoData
      processing={processing}
      imageSrc={budgeting}
      title='Create Budget'
      toastClassname={'bottom-24'}
      subTitle={`Creating a budget is the first step to financial success. Define your spending limits and allocate resources strategically to achieve your business goals`}
    />
  );
};
