import { SideNavigationItems } from './SideNavigationItems';
import { useEffect, useRef } from 'react';

export const SideNavigation = () => {
  const timeout = useRef<any>(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  return (
    <div className='thin-scrollbar fixed left-0 top-0 z-[1200] w-[324px] overflow-x-visible  overflow-y-scroll bg-neutral-100'>
      <SideNavigationItems />
    </div>
  );
};
