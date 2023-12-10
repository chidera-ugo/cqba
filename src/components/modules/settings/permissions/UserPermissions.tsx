import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { PermissionGroupCard } from 'components/modules/settings/permissions/PermissionsGroupCard';
import { useGetAllPermissionsGroups } from 'hooks/api/permissions/useGetAllPermissionsGroups';

export const UserPermissions = () => {
  const { isLoading, isError, data } = useGetAllPermissionsGroups();

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError className={'py-20'} />;

  return (
    <div className={'grid grid-cols-12 gap-4'}>
      {data?.map((group) => {
        return (
          <PermissionGroupCard
            className={'card col-span-12 768:col-span-6 1180:col-span-4 '}
            key={group._id}
            {...group}
          />
        );
      })}
    </div>
  );
};
