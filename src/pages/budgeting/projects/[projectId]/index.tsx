import clsx from 'clsx';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AppLayout } from 'components/layouts/AppLayout';
import { ToggleLayout } from 'components/modules/app/ToggleLayout';
import { ProjectDetails } from 'components/modules/budgeting/projects/ProjectDetails';
import { budgetingFilterOptions } from 'constants/budgeting/filters';
import { useGetProjectById } from 'hooks/api/budgeting/project/useGetProjectById';
import { useToggleLayout } from 'hooks/app/useToggleLayout';
import { defaultStringifySearch } from 'hooks/client_api/search_params';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ProjectDetailsPage() {
  const { query } = useRouter();

  const _q = query['projectId'];
  const projectId = typeof _q === 'string' ? _q : '';

  const { isLoading, isError, data, isRefetching } = useGetProjectById(
    projectId,
    {
      enabled: !!projectId,
    }
  );

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const { layout, setLayout } = useToggleLayout();

  const backToBudgetingHref = `/budgeting${defaultStringifySearch({
    status: budgetingFilterOptions[1]!,
  })}`;

  return (
    <AppLayout
      title={'Budget'}
      breadCrumbs={[
        {
          title: 'Budgets',
          url: backToBudgetingHref,
        },
        {
          title: 'Track Project',
        },
      ]}
      enabledFor={'owner'}
      breadCrumbsSlot={
        <div className={clsx('my-auto hidden gap-2 1180:flex')}>
          <SearchInput
            placeholder='Search budgets'
            value={search}
            wrapperClassname={'640:w-auto w-full'}
            className='w-full 640:w-[300px]'
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            clear={() => setSearch('')}
          />

          <ToggleLayout {...{ layout, setLayout }} />
        </div>
      }
    >
      <AppErrorBoundary>
        <ProjectDetails
          search={debouncedSearch}
          {...{
            projectId,
            layout,
            data,
            isRefetching,
            isError,
            isLoading,
          }}
        />
      </AppErrorBoundary>
    </AppLayout>
  );
}
