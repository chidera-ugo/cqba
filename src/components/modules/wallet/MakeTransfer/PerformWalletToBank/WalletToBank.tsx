import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { WalletToBankForm } from 'components/forms/wallet/make-transfer/WalletToBankForm';
import { useGetInstitutions } from 'hooks/api/wallet/useGetInstitutions';
import { Dispatch, SetStateAction } from 'react';

export const WalletToBank = (props: {
  setFormRecoveryValues: Dispatch<SetStateAction<Record<string, any> | null>>;
  formRecoveryValues: Record<string, any> | null;
  createBudget: () => void;
  close: () => void;
}) => {
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
