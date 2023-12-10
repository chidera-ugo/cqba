import { AppLayout } from 'components/layouts/AppLayout';
import { BudgetsOverview } from 'components/modules/overview/BudgetsOverview';
import { CashflowOverview } from 'components/modules/overview/CashflowOverview';
import { Overview } from 'components/modules/overview/Overview';
import { useUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { overviewFiltersSchema } from 'zod_schemas/overview_schema';

export default function Home() {
  const { filters, setFilters, range, setRange } = useUrlManagedState(
    overviewFiltersSchema,
    undefined,
    'rangePreset.value'
  );

  return (
    <AppLayout title='Overview'>
      <Overview />

      <div className='mt-5 grid-cols-12 gap-5 1280:grid'>
        <div className='col-span-8'>
          <CashflowOverview {...{ setFilters, filters, setRange, range }} />
        </div>

        <div className='col-span-4 mt-5 1280:mt-0'>
          <BudgetsOverview />
        </div>
      </div>
    </AppLayout>
  );
}
