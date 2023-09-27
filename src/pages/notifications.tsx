import { AppLayout } from 'components/layouts/AppLayout';
import NotFound from 'pages/404';

export default function Notifications() {
  if (!false) return <NotFound />;
  return <AppLayout title='Notifications'></AppLayout>;
}
