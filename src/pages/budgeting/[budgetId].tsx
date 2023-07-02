import { AppLayout } from 'components/layouts/AppLayout';
import { ApprovedBudgetDetails } from 'components/modules/budgeting/ApprovedBudgetDetails';

export default function BudgetDetails() {
  return (
    <AppLayout title='Budget Details' back={'/budgeting'}>
      <ApprovedBudgetDetails />
    </AppLayout>
  );
}
