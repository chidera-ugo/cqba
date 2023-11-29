import { AppLayout } from 'components/layouts/AppLayout';
import { FundWallet } from 'components/modules/wallet/FundWallet';
import { MakeTransfer } from 'components/modules/wallet/MakeTransfer';
import { WalletTransactions } from 'components/modules/wallet/WalletTransactions';
import { WalletOverview } from 'components/modules/wallet/WalletOverview';

export default function Wallet() {
  return (
    <AppLayout title='Wallet'>
      <WalletOverview />

      <WalletTransactions>
        <div className='mt-4 w-full gap-3 375:flex 1180:mt-0 1180:w-auto'>
          <FundWallet />
          <MakeTransfer />
        </div>
      </WalletTransactions>
    </AppLayout>
  );
}
