import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { WalletToBankForm } from 'components/forms/wallet/make-transfer/WalletToBankForm';
import { WalletToBankFormRecoveryValues } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank/index';
import { useGetInstitutions } from 'hooks/api/wallet/useGetInstitutions';
import { FormRecoveryProps } from 'types/forms/form_recovery';

export const WalletToBank = (
  props: {
    createBudget: () => void;
    close: () => void;
  } & FormRecoveryProps<WalletToBankFormRecoveryValues>
) => {
  const { isLoading, isError, data } = useGetInstitutions();

  if (isLoading) return <IsLoading />;

  if (isError)
    return (
      <IsError
        title='An error occurred'
        description='Failed to get institutions'
      />
    );

  return (
    <WalletToBankForm
      {...props}
      institutions={data?.map(({ bank, id, type }) => ({
        id,
        type,
        bankName: bank.name,
        bankCode: bank.nipCode,
      }))}
    />
  );
};
