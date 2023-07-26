import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { MakeTransferToSubAccountForm } from 'components/forms/wallet/make-transfer/MakeTransferToSubAccountForm';
import { Transact } from 'components/modules/core/Transact';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useTransact } from 'hooks/dashboard/core/useTransact';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  close: () => void;
  setModalTitle: Dispatch<SetStateAction<string>>;
}

export const SubAccounts = ({ setModalTitle, close }: Props) => {
  const { isLoading, isError, data } = useMakeDummyHttpRequest({
    method: 'get',
    res: subAccounts,
  });

  const transact = useTransact({
    transactionType: 'other-banks-transfer',
    actionOnAuthorize() {
      setModalTitle('Authorize transaction');
    },
  });

  const { mode, authorize } = transact;

  if (isLoading) return <IsLoading />;
  if (isError)
    return (
      <IsError
        title='An error occurred'
        description='Failed to get institutions'
      />
    );

  if (!mode)
    return (
      <MakeTransferToSubAccountForm proceed={authorize} subAccounts={data!} />
    );

  return (
    <Transact
      {...transact}
      finish={close}
      hideModalTitle={() => setModalTitle('')}
    />
  );
};

const subAccounts = [
  {
    accountName: 'Azej Hodm',
    accountNumber: '0185882885',
  },
  {
    accountName: 'John Doe',
    accountNumber: '0184982188',
  },
  {
    accountName: 'Jane Doe',
    accountNumber: '0481038818',
  },
  {
    accountName: 'Janet Doe',
    accountNumber: '4810348184',
  },
  {
    accountName: 'Zinaad Ahemd',
    accountNumber: '4811348184',
  },
];
