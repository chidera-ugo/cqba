import { BankTransfer } from 'components/modules/wallet/FundWallet/methods/BankTransfer';
import { FundAccountMethod } from './FundWalletMethodSelector';

interface Props {
  currentMethod: FundAccountMethod;
}

export const FundWalletMethods = ({ currentMethod }: Props) => {
  if (currentMethod.id === 'bank-transfer') return <BankTransfer />;
  return <div></div>;
};
