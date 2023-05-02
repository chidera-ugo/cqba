import { RightModalWrapper } from 'components/modal/ModalWrapper';
import {
  FundAccountMethod,
  FundWalletMethodSelector,
} from 'components/modules/wallet/FundWallet/FundWalletMethodSelector';
import { Inbound } from 'components/svgs/navigation/Arrows';
import { useState } from 'react';
import { Card } from 'components/svgs/dashboard/Icons_NavigationItems';
import { Home, Wallet } from 'components/svgs/wallet/Icons_FundWallet';
import { FundWalletMethods } from 'components/modules/wallet/FundWallet/FundWalletMethods';

export const FundWallet = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentMethod, setCurrentMethod] = useState<FundAccountMethod | null>(
    null
  );

  return (
    <>
      <RightModalWrapper
        {...{
          show: showModal,
          close() {
            if (currentMethod) {
              setCurrentMethod(null);
            } else {
              setShowModal(false);
            }
          },
        }}
        title={currentMethod?.title ?? 'Fund wallet'}
      >
        {currentMethod ? (
          <FundWalletMethods {...{ currentMethod }} />
        ) : (
          <FundWalletMethodSelector {...{ setCurrentMethod, methods }} />
        )}
      </RightModalWrapper>

      <button
        onClick={() => setShowModal(true)}
        className='dark-button x-center h-11 w-full px-4 text-sm font-semibold 768:w-auto'
      >
        <span className='my-auto mr-2'>Fund wallet</span>
        <span className='my-auto'>
          <Inbound />
        </span>
      </button>
    </>
  );
};

export const methods: FundAccountMethod[] = [
  {
    icon: <Home />,
    title: 'Bank transfer',
    description: 'Make direct transfer to your account',
    enabled: true,
    id: 'bank-transfer',
  },
  {
    icon: <Card />,
    title: 'Fund with debit card',
    description: 'Connect your card to fund',
    id: 'debit-card',
  },
  {
    icon: <Wallet />,
    title: 'Fund direct from bank account',
    description: 'Make a direct bank debit',
    id: 'bank-account',
  },
];
