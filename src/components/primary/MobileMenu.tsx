import { MobileMenuWrapper } from 'components/modal/ModalWrapper';
import { Hamburger } from 'components/svgs/navigation/Menu';
import { useState } from 'react';
import { SideNavigationContent } from 'components/primary/SideNavigation';

export const MobileMenu = () => {
  const [show, setShow] = useState(false);

  function closeModal() {
    setShow(false);
  }

  return (
    <div className='y-center block 1024:hidden'>
      <div className='y-center h-full'>
        <button
          onClick={() => setShow(!show)}
          className='my-auto h-10 w-10 rounded-lg'
        >
          <div className='x-center my-auto'>
            <Hamburger />
          </div>
        </button>
      </div>

      <MobileMenuWrapper
        {...{
          show,
          closeModal,
        }}
      >
        <SideNavigationContent {...{ closeModal }} mobile />
      </MobileMenuWrapper>
    </div>
  );
};
