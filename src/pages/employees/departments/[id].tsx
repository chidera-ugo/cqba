import { AppLayout } from 'components/layouts/AppLayout';
import { EmployeesDepartmentInformation } from 'components/modules/departments/EmployeesDepartmentInformation';

export default function DepartmentDetails() {
  return (
    <AppLayout title='Department Details' back={'/employees?_t=departments'}>
      <EmployeesDepartmentInformation />
    </AppLayout>
  );
}
