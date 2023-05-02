import { TabOption, Tabs } from 'components/common/Tabs';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { OtherBanks } from 'components/modules/wallet/MakeTransfer/OtherBanks';
import { Outbound } from 'components/svgs/navigation/Arrows';
import { useEffect, useState } from 'react';

export const MakeTransfer = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabOption>(tabs[0]!);
  const [modalTitle, setModalTitle] = useState('');
  const [showMethodSwitchTabs, setShowMethodSwitchTabs] = useState(true);

  useEffect(() => {
    setModalTitle('Make a transfer');
  }, [showModal]);

  return (
    <>
      <RightModalWrapper
        {...{
          show: showModal,
          close() {
            setShowModal(false);
          },
        }}
        title={modalTitle}
        slot={
          showMethodSwitchTabs ? (
            <div className='bg-white px-4 pt-4 640:px-8'>
              <Tabs
                className='h-10'
                layoutId='make-transfer'
                {...{ currentTab, tabs, setCurrentTab }}
              />
            </div>
          ) : undefined
        }
        childrenClassname='py-0 640:px-8 px-4'
      >
        {currentTab.value === 'other-banks' && (
          <OtherBanks
            close={() => setShowModal(false)}
            {...{
              setModalTitle,
            }}
            hideMethodSwitchTabs={() => setShowMethodSwitchTabs(false)}
          />
        )}
      </RightModalWrapper>

      <button
        onClick={() => setShowModal(true)}
        className='primary-button x-center mt-3 h-11 w-full px-4 text-sm font-semibold 425:mt-0 768:w-auto'
      >
        <span className='my-auto mr-2'>Make a transfer</span>
        <span className='my-auto'>
          <Outbound />
        </span>
      </button>
    </>
  );
};

const tabs = [
  { name: 'Send to other banks', value: 'other-banks' },
  { name: 'Send to sub account', value: 'sub-account' },
];
