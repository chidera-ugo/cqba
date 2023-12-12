import clsx from 'clsx';
import { Dropdown } from 'components/commons/Dropdown';
import { ChevronDown } from 'components/svgs/navigation/Chevrons';
import { Exit } from 'components/svgs/navigation/Exit';
import { useAppContext } from 'context/AppContext';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useDestroySession } from 'hooks/app/useDestroySession';
import { useState } from 'react';

export const ProfileSwitcher = ({
  mobile,
  className,
  top,
}: {
  mobile?: boolean;
  className?: string;
  top?: boolean;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { state } = useAppContext();
  const { user } = state;
  const id = `${mobile ? 'profile-switcher-mobile' : 'profile-switcher'}${
    top ? 'bottom' : ''
  }`;

  const { destroySession } = useDestroySession();

  const { data } = useGetOrganizationInformation();

  const isOwner = user?.role === 'owner';

  return (
    <div
      className={clsx(
        'sticky top-0 left-0 z-[100] p-4 pb-0 640:p-4',
        className,
        isOwner ? 'bg-neutral-100' : 'bg-neutral-1000'
      )}
    >
      <div id={id} className='relative'>
        <button
          className={clsx(
            'x-between relative z-[25] w-full rounded-xl border border-neutral-180 p-3',
            isOwner ? 'bg-white' : 'bg-neutral-900'
          )}
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <div className='flex gap-2.5'>
            <div className='my-auto text-left'>
              <div
                className={clsx(
                  'break-all text-base font-semibold line-clamp-1',
                  isOwner ? 'text-neutral-1000' : 'text-white'
                )}
              >
                {data?.businessName ?? '----'}
              </div>
              <div
                className={clsx(
                  'break-all text-xs line-clamp-1',
                  isOwner ? 'text-neutral-600' : 'text-neutral-400'
                )}
              >
                {!user?.firstName
                  ? user?.email
                  : `${user?.firstName} ${user?.lastName}`}
              </div>
            </div>
          </div>

          <div className='my-auto text-primary-main'>
            <ChevronDown
              className={clsx(
                'h-5 w-5 duration-200',
                showDropdown ? 'rotate-180' : 'rotate-0'
              )}
            />
          </div>
        </button>

        <Dropdown
          show={showDropdown}
          className={clsx(
            'border-none p-4',
            isOwner ? 'bg-white' : 'bg-neutral-900'
          )}
          dismiss={() => setShowDropdown(false)}
          anchorPosition={top ? 'top' : 'bottom'}
          wrapperId={id}
        >
          <button onClick={() => destroySession()} className='flex w-full'>
            <span className='my-auto mr-2'>
              <Exit />
            </span>
            <span
              className={clsx(
                'my-auto text-sm font-semibold',
                isOwner ? 'text-neutral-1000' : 'text-white'
              )}
            >
              Logout
            </span>
          </button>
        </Dropdown>
      </div>
    </div>
  );
};
