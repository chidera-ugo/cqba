import { AppLayout } from 'components/layouts/AppLayout';
import { FundWallet } from 'components/modules/wallet/FundWallet';
import { MakeTransfer } from 'components/modules/wallet/MakeTransfer';
import { WalletTransactions } from 'components/modules/wallet/WalletTransactions';
import { WalletOverview } from 'components/modules/wallet/WalletOverview';
import { useUserRole } from 'hooks/access_control/useUserRole';

export default function Wallet() {
  const { isOwner } = useUserRole();

  return (
    <AppLayout title='Wallet'>
      <WalletOverview />

      <WalletTransactions>
        <div className='mt-4 w-full 375:flex 1180:mt-0 1180:w-auto'>
          {isOwner && <FundWallet />}

          <MakeTransfer />
        </div>
      </WalletTransactions>
    </AppLayout>
  );
}
