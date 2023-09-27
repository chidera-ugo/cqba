import { AppLayout } from 'components/layouts/AppLayout';
import { SubAccountsDepartmentInformation } from 'components/modules/departments/SubAccountsDepartmentInformation';
import NotFound from 'pages/404';

export default function DepartmentDetails() {
  if (!false) return <NotFound />;

  return (
    <AppLayout title='Department Details' back={'/sub-accounts?_t=departments'}>
      <SubAccountsDepartmentInformation />
    </AppLayout>
  );
}
