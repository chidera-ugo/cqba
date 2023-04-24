import { Filter } from 'components/form-elements/Filter';
import { AppLayout } from 'components/layouts/AppLayout';
import { InflowOutflow } from 'components/modules/overview/InflowOutflow';
import { Overview } from 'components/modules/overview/Overview';
import { useAppContext } from 'context/AppContext';
import { useState } from 'react';

export default function Home() {
  const { user } = useAppContext().state;
  const [_filter, setFilter] = useState('');

  return (
    <AppLayout title='Overview'>
      <div className='x-between'>
        <h5 className='my-auto'>Hi {user?.firstName}, Welcome to ChequeBase</h5>

        <div className='flex'>
          <Filter
            id='overview-filter'
            onChange={(option) => {
              setFilter(option.name);
            }}
            options={[
              { value: 7, name: 'Last 7 Days' },
              { value: 30, name: 'Last 30 Days' },
            ]}
          />
        </div>
      </div>

      <div className='mt-8'>
        <Overview />
      </div>
      <div className='mt-5'>
        <InflowOutflow />
      </div>
    </AppLayout>
  );
}
