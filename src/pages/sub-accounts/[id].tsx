import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { SubAccountInformation } from 'components/modules/sub-accounts/SubAccountInformation';
import { AppLayout } from 'components/layouts/AppLayout';
import { useGetSubAccountById } from 'hooks/api/sub-accounts/useGetSubAccountById';
import { useRouter } from 'next/router';
import NotFound from 'pages/404';
import { getValidQueryParam } from 'utils/getters/getValidQueryParam';

export default function SubAccountDetails() {
  const { query } = useRouter();

  const isFromDepartmentsPage =
    getValidQueryParam(query['_f']) === 'departments';

  const id = getValidQueryParam(query['id']);

  const { isLoading, isError, data } = useGetSubAccountById(id, {
    enabled: false,
  });

  if (!false) return <NotFound />;

  return (
    <AppLayout
      title='Sub Account Details'
      back={
        isFromDepartmentsPage && data
          ? `/sub-accounts/departments/${data.departmentId}`
          : '/sub-accounts'
      }
    >
      {isLoading ? (
        <IsLoading />
      ) : isError ? (
        <IsError description={'Failed to get account information'} />
      ) : (
        <SubAccountInformation data={data} />
      )}
    </AppLayout>
  );
}
