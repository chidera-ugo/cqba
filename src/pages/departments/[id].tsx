import { AppLayout } from 'components/layouts/AppLayout';
import { DepartmentInformation } from 'components/modules/departments/DepartmentInformation';

export default function DepartmentDetails() {
  return (
    <AppLayout title='Department Details' back={'/sub-accounts?_c=department'}>
      <DepartmentInformation />
    </AppLayout>
  );
}
