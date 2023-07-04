import { AppLayout } from 'components/layouts/AppLayout';
import { SubAccountsDepartmentInformation } from 'components/modules/departments/SubAccountsDepartmentInformation';

export default function DepartmentDetails() {
  return (
    <AppLayout title='Department Details' back={'/sub-accounts?_t=departments'}>
      <SubAccountsDepartmentInformation />
    </AppLayout>
  );
}
