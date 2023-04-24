import clsx from 'clsx';
import { Dropdown } from 'components/common/Dropdown';
import { ChevronDown } from 'components/svgs/Chevrons';
import { Exit } from 'components/svgs/Exit';
import { PlusCircle } from 'components/svgs/Plus';
import { deleteFromLocalStore } from 'lib/localStore';
import { useAppStore } from 'lib/useAppStore';
import { useState } from 'react';

export const ProfileSwitcher = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useAppStore((state) => state.user);
  const _logout = useAppStore((state) => state.logout);

  function logout() {
    deleteFromLocalStore('tokens');
    _logout();
  }

  return (
    <div className='sticky top-0 left-0 bg-neutral-100 p-8 pb-0'>
      <div id='profile-switcher' className='relative'>
        <button
          className='x-between relative z-[30] w-full rounded-2xl bg-neutral-200 p-2.5'
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <div className='flex'>
            <div className='y-center mr-2.5 h-12 w-12 rounded-full bg-white font-semibold'>
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}
            </div>

            <div className='my-auto text-left'>
              <div className='text-base font-semibold text-neutral-1000 line-clamp-1'>
                {user?.businessName}
              </div>
              <div className='text-xs text-neutral-600 line-clamp-1'>
                {user?.firstName} {user?.lastName}
              </div>
            </div>
          </div>

          <div className='my-auto text-primary-main'>
            <ChevronDown
              className={clsx(
                'h-6 w-6 duration-200',
                showDropdown ? 'rotate-180' : 'rotate-0'
              )}
            />
          </div>
        </button>

        <Dropdown
          show={showDropdown}
          className='border-none bg-neutral-200 p-4'
          close={() => setShowDropdown(false)}
          wrapperId='profile-switcher'
        >
          <p className='text-xs font-medium text-neutral-600'>Switch Profile</p>

          <button className='x-between mt-5 w-full'>
            <span className='my-auto text-sm font-semibold text-neutral-1000'>
              Add business
            </span>
            <span className='my-auto'>
              <PlusCircle />
            </span>
          </button>

          <button onClick={logout} className='mt-4 flex'>
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
