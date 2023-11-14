import { AppLayout } from 'components/layouts/AppLayout';
import { Analytics } from 'components/modules/overview/Analytics';
import { Overview } from 'components/modules/overview/Overview';
import { TopCategories } from 'components/modules/overview/TopCategories';
import { useAppContext } from 'context/AppContext';

export default function Home() {
  const { user } = useAppContext().state;

  return (
    <AppLayout title='Overview'>
      <div className='x-between block 640:flex'>
        <h5>
          Hi {user?.firstName},{' '}
          <span className={'text-neutral-400'}>Welcome to ChequeBase</span>
        </h5>
      </div>

      <div className='mt-4'>
        <Overview />
      </div>

      <div className='mt-5  grid-cols-12 gap-5 1280:grid'>
        <div className='col-span-8'>
          <Analytics />
        </div>

        <div className='col-span-4 mt-5 1280:mt-0'>
          <TopCategories />
        </div>
      </div>
    </AppLayout>
  );
}
