import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { Dropdown } from 'components/commons/Dropdown';
import { ChevronDown } from 'components/svgs/navigation/Chevrons';
import { Exit } from 'components/svgs/navigation/Exit';
import { useAppContext } from 'context/AppContext';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useDestroySession } from 'hooks/app/useDestroySession';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
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

  const { getColor } = useGetColorByChar();

  return (
    <div
      className={clsx(
        'sticky top-0 left-0 z-[100] bg-white p-5 pb-0 640:p-8 1024:bg-neutral-100',
        className
      )}
    >
      <div id={id} className='relative'>
        <button
          className='x-between relative z-[25] w-full rounded-2xl bg-white p-2.5'
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <div className='flex'>
            <Avatar
              size={48}
              className={'mr-2.5'}
              getBackgroundColor={getColor}
            />

            <div className='my-auto text-left'>
              <div className='break-all text-base font-semibold text-neutral-1000 line-clamp-1'>
                {data?.businessName ?? '----'}
              </div>
              <div className='break-all text-xs text-neutral-600 line-clamp-1'>
                {user?.email}
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
          className='border-none bg-white p-4'
          dismiss={() => setShowDropdown(false)}
          anchorPosition={top ? 'top' : 'bottom'}
          wrapperId={id}
        >
          <button onClick={() => destroySession()} className='flex w-full'>
            <span className='my-auto mr-2'>
              <Exit />
            </span>
            <span className='my-auto text-sm font-semibold text-neutral-1000'>
              Logout
            </span>
          </button>
        </Dropdown>
      </div>
    </div>
  );
};
