import { AppLayout } from 'components/layouts/AppLayout';
import { WalletTransactions } from 'components/modules/wallet/WalletTransactions';
import { WalletOverview } from 'components/modules/wallet/WalletOverview';

export default function Wallet() {
  return (
    <AppLayout title='Wallet'>
      <div className='flex'>
        <WalletOverview />
      </div>

      <WalletTransactions />
    </AppLayout>
  );
}
