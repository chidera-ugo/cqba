import { NoData } from 'components/core/Table/NoData';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { EmptyReports } from 'components/svgs/overview/EmptyReports';
import { useGetAllBudgetsUnpaginated } from 'hooks/api/budgeting/useGetAllBudgets';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';

export const ActiveBudgetsOverview = () => {
  const { isVerified } = useIsVerified();

  const { isLoading, isError, data } = useGetAllBudgetsUnpaginated({});

  if (isVerified && isLoading) return <IsLoading />;

  if (isError) return <IsError className={'py-20'} />;

  if (!data?.docs?.length)
    return (
      <div>
        <NoData
          noToast
          processing={isLoading}
          icon={<EmptyReports />}
          subTitle={`Your Budget reports will be displayed here`}
        />
      </div>
    );

  return <>hello</>;
};
