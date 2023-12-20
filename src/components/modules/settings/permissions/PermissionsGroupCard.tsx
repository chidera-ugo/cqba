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
  className,
  description,
  detailed,
  role,
  _id,
}: Props) => {
  const { isLoading, data } = useGetPermissionGroupUsers(role);

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

      <div className={clsx('x-between w-full', detailed && 'mt-10')}>
        <div className={'mt-auto w-full'}>
          {detailed && (
            <p className={'mb-2 text-neutral-400'}>
              Team members with this role
            </p>
          )}

          <div className={clsx(!detailed && 'h-10')}>
            {isLoading ? (
              <Spinner className={'h-full text-primary-main'} />
            ) : data ? (
              <div
                className={clsx('relative h-full w-full', !detailed && 'flex')}
              >
                {handleSort({
                  data: data.slice(0, 5),
                  sortBy: 'email',
                })?.map(({ email, firstName, lastName, avatar }, i) => {
                  return (
                    <div
                      key={email}
                      className={clsx(
                        !detailed ? 'absolute' : 'mt-2',
                        'bottom-0 z-10 flex gap-2'
                      )}
                      style={{
                        zIndex: 10 + i,
                        left: 32 * i,
                      }}
                    >
                      <Avatar
                        className={clsx('my-auto ring-2 ring-white')}
                        size={detailed ? 32 : 40}
                        avatar={avatar}
                        key={email}
                        initials={
                          !!firstName
                            ? `${firstName?.charAt(0)}${lastName?.charAt(0)}`
                            : email?.charAt(0)
                        }
                        getBackgroundColor={getColor}
                      />

                      {detailed && (
                        <span className={'my-auto font-normal'}>
                          {!!firstName ? `${firstName} ${lastName}` : email}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        {!detailed && (
          <Link
            className={
              'mt-auto -mr-4 -mb-4 flex-shrink-0 p-4 text-sm font-medium text-primary-main'
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
