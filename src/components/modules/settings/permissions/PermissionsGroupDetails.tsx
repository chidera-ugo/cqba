import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { ManageEmployee } from 'components/modules/employees/ManageEmployee';
import { PermissionGroupCard } from 'components/modules/settings/permissions/PermissionsGroupCard';
import { useGetAllPermissionsGroups } from 'hooks/api/permissions/useGetAllPermissionsGroups';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const PermissionsGroupDetails = () => {
  const { query } = useRouter();
  const { isLoading, isError, data } = useGetAllPermissionsGroups();
  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError className={'py-20'} />;

  const permissionsGroup = data?.find(({ _id }) => _id === query['id']);

  if (!permissionsGroup) return <IsError className={'py-20'} />;

  const permissions = permissionsGroup!.permissions;

  return (
    <>
      <ManageEmployee
        role={'employee'}
        modal={showModal ? 'add_employee' : null}
        closeModal={() => setShowModal(false)}
      />

      <div className={'grid-cols-12 gap-5 768:grid'}>
        <div className='col-span-6'>
          <div className='card'>
            <PermissionGroupCard {...permissionsGroup} detailed />

            <button
              type={'button'}
              onClick={() => setShowModal(true)}
              className={'primary-button mt-8'}
            >
              Send Invitation
            </button>
          </div>
        </div>

        <div className='card col-span-6 mt-5 768:mt-0'>
          {Object.keys(permissions)?.map((key) => {
            return (
              <div key={key} className={'mb-4'}>
                <h6 className={'capitalize'}>{key}</h6>

                <ul className={'mt-2 ml-3'}>
                  {permissions[key]?.map((permission) => {
                    return (
                      <li
                        key={permission}
                        className={'text-sm text-neutral-500 640:text-base'}
                      >
                        {permission}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Todo: Hide for owners */}
    </>
  );
};
