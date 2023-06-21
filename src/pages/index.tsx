import { AppLayout } from 'components/layouts/AppLayout';
import { InflowOutflow } from 'components/modules/overview/InflowOutflow';
import { Overview } from 'components/modules/overview/Overview';
import { useAppContext } from 'context/AppContext';

export default function Home() {
  const { user } = useAppContext().state;

  return (
    <AppLayout title='Overview'>
      <div className='x-between block 640:flex'>
        <h5>Hi {user?.firstName}, Welcome to ChequeBase</h5>
      </div>

      <div className='mt-4'>
        <Overview />
      </div>
      <div className='mt-5'>
        <InflowOutflow />
      </div>
    </AppLayout>
  );
}
