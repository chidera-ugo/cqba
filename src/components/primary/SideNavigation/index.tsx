import { SideNavigationItems } from './SideNavigationItems';
import { ProfileSwitcher } from 'components/primary/SideNavigation/ProfileSwitcher';
import Link from 'next/link';
import Image from 'next/image';
import logo from '/public/logos/main-logo.svg';

export const SideNavigation = () => {
  return (
    <div className='thin-scrollbar fixed left-0 top-0 z-[1200] w-[324px] overflow-x-visible bg-neutral-100'>
      <div className='relative z-10 h-full min-h-full'>
        <SideNavigationContent />
      </div>
    </div>
  );
};

export const SideNavigationContent = ({ mobile }: { mobile?: boolean }) => {
  return (
    <div className='y-between relative h-screen'>
      <div className='h-max'>
        <ProfileSwitcher {...{ mobile }} />

        <div className='p-5 pt-0 640:p-8 640:pt-0'>
          <SideNavigationItems />
        </div>
      </div>

      <div className='sticky bottom-0 left-0 mt-auto bg-white py-5 px-5 640:px-8 1024:bg-neutral-100'>
        <div className='flex'>
          <Link href='/' className='my-auto'>
            <Image
              src={logo}
              priority
              alt='chequebase-logo'
              className='my-auto w-[160px] object-contain'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
