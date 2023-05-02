import { Filter } from 'components/form-elements/Filter';
import { AppLayout } from 'components/layouts/AppLayout';
import { InflowOutflow } from 'components/modules/overview/InflowOutflow';
import { Overview } from 'components/modules/overview/Overview';
import { useAppContext } from 'context/AppContext';
import { useState } from 'react';

export default function Home() {
  const { user } = useAppContext().state;
  const [filters, setFilters] = useState<Record<string, any>>({});

  return (
    <AppLayout title='Overview'>
      <div className='x-between block 640:flex'>
        <h5>Hi {user?.firstName}, Welcome to ChequeBase</h5>

        <div className='mt-4 flex 640:mt-0'>
          <Filter
            id='overview-filter'
            {...{ filters, setFilters }}
            dropdownClassName='640:right-0 640:left-auto left-0'
            options={[
              { value: 7, name: 'Last 7 Days' },
              { value: 30, name: 'Last 30 Days' },
            ]}
          />
        </div>
      </div>

      <div className='mt-4 640:mt-8'>
        <Overview />
      </div>
      <div className='mt-5'>
        <InflowOutflow />
      </div>
    </AppLayout>
  );
}
