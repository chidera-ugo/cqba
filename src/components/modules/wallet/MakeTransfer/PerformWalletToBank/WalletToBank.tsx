import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { WalletToBankForm } from 'components/forms/wallet/make-transfer/WalletToBankForm';
import { WalletToBankFormRecoveryValues } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank/index';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useGetInstitutions } from 'hooks/api/wallet/useGetInstitutions';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { FormRecoveryProps } from 'types/forms/form_recovery';

export const WalletToBank = (
  props: {
    createBudget: () => void;
    close: () => void;
    budget?: IBudget;
  } & FormRecoveryProps<WalletToBankFormRecoveryValues>
) => {
  const { isLoading, isError, data } = useGetInstitutions();
  const {
    isLoading: loadingWallet,
    isError: walletErrored,
    primaryWallet,
  } = useManageWallets();

  if (isLoading || loadingWallet) return <IsLoading />;

  if (isError || walletErrored)
    return <IsError description='An error occurred' />;

  return (
    <WalletToBankForm
      {...props}
      currency={primaryWallet?.currency}
      institutions={data?.map(({ bank, id, type }) => ({
        id,
        type,
        bankName: bank.name,
        bankCode: bank.nipCode,
      }))}
    />
  );
};
