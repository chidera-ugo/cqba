import { AppLayout } from 'components/layouts/AppLayout';
import { EmployeesDepartmentInformation } from 'components/modules/departments/EmployeesDepartmentInformation';
import NotFound from 'pages/404';

export default function DepartmentDetails() {
  if (!false) return <NotFound />;

  return (
    <AppLayout title='Department Details' back={'/employees?_t=departments'}>
      <EmployeesDepartmentInformation />
    </AppLayout>
  );
}
