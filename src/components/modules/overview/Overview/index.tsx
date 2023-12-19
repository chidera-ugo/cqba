import clsx from 'clsx';
import { FilterWithRangePreset } from 'components/modules/commons/FilterWithRangePreset';
import { SummaryCards } from 'components/modules/overview/Overview/SummaryCards';
import { useAppContext } from 'context/AppContext';
import { useState } from 'react';
import { getDateRange } from 'utils/getters/getDateRange';

export const Overview = () => {
  const { user } = useAppContext().state;
  const [range, setRange] = useState(getDateRange({ days: 7 }));
  const [filters, setFilters] = useState<Record<string, any>>({});
  return (
    <>
      <div className='x-between app-container gap-4'>
        <h5
          className={
            'my-auto text-base leading-5 640:text-[20px] 640:leading-6'
          }
        >
          Hi {user?.firstName}, Welcome to ChequeBase
        </h5>

        <FilterWithRangePreset
          buttonClassname={'px-2 h-10'}
          {...{
            filters,
            setFilters,
            range,
            setRange,
          }}
        />
      </div>

      <div className='hidden-scrollbar mt-5 w-full overflow-x-auto px-3 640:px-8'>
        <div className={clsx('min-w-fit')}>
          <SummaryCards range={range} />
        </div>
      </div>
    </>
  );
};
