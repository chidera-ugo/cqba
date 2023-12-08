import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { PermissionsGroup } from 'hooks/api/permissions/useGetAllPermissionsGroups';
import { useGetPermissionGroupUsers } from 'hooks/api/permissions/useGetPermissionGroupUsers';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import Link from 'next/link';
import { handleSort } from 'utils/handlers/handleSort';

type Props = {
  className?: string;
  detailed?: boolean;
} & PermissionsGroup;

export const PermissionGroupCard = ({
  name,
  _id,
  className,
  description,
  detailed,
}: Props) => {
  const { isLoading, data } = useGetPermissionGroupUsers(_id);

  const { getColor } = useGetColorByChar();

  return (
    <div className={clsx('y-between min-h-[240px]', className)}>
      <div>
        {detailed && <p className={'mb-1 text-neutral-400'}>Name of role</p>}

        <h6 className={'text-lg text-neutral-1000'}>{name}</h6>

        <div className={clsx(detailed ? 'mt-5' : 'mt-2')}>
          {detailed && <p className={'text-neutral-400'}>Role Description</p>}

          <p
            className={clsx(
              'mt-2 text-neutral-1000',
              detailed ? 'font-medium' : 'line-clamp-2'
            )}
          >
            {description}
          </p>
        </div>
      </div>

      <div className={clsx('x-between h-12', detailed && 'mt-10')}>
        <div className={'mt-auto'}>
          {detailed && (
            <p className={'mb-1 text-neutral-400'}>
              Team members with this role
            </p>
          )}

          {isLoading ? (
            <Spinner className={'text-primary-main'} />
          ) : data ? (
            <div className={clsx('relative flex')}>
              {handleSort({
                data: data,
                sortBy: 'email',
              })?.map(({ email }, i) => {
                return (
                  <div
                    key={email}
                    className={clsx('absolute', 'right-0 top-0 z-10')}
                    style={{
                      zIndex: 10 + i,
                      right: 23 * i,
                    }}
                  >
                    <Avatar
                      className={clsx('-ml-2 ring-2 ring-white')}
                      size={27}
                      key={email}
                      char={email.charAt(0)}
                      getBackgroundColor={getColor}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {!detailed && (
          <Link
            className={
              'mt-auto -mr-4 -mb-4 p-4 text-sm font-medium text-primary-main'
            }
            href={`/settings/user-permissions/${_id}`}
          >
            See Permission
          </Link>
        )}
      </div>
    </div>
  );
};
