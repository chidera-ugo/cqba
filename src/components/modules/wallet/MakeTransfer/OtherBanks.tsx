import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { MakeTransferToOtherBanksForm } from 'components/forms/wallet/make-transfer/MakeTransferToOtherBanksForm';
import { Transact } from 'components/modules/core/Transact';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useTransact } from 'hooks/dashboard/core/useTransact';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  close: () => void;
  setModalTitle: Dispatch<SetStateAction<string>>;
  hideMethodSwitchTabs: () => void;
}

export const OtherBanks = ({
  setModalTitle,
  hideMethodSwitchTabs,
  close,
}: Props) => {
  const { isLoading, isError, data } = useMakeDummyHttpRequest({
    method: 'get',
    res: institutions,
  });

  const transact = useTransact({
    transactionType: 'other-banks-transfer',
    actionOnAuthorize() {
      hideMethodSwitchTabs();
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
      <MakeTransferToOtherBanksForm proceed={authorize} institutions={data!} />
    );

  return (
    <Transact
      {...transact}
      finish={close}
      hideModalTitle={() => setModalTitle('')}
    />
  );
};

const institutions = [
  {
    name: 'Access Bank',
    code: '044',
  },
  {
    name: 'GT Bank',
    code: '0481',
  },
  {
    name: 'FCMB',
    code: '4810',
  },
  {
    name: 'Polaris Bank',
    code: '481',
  },
  {
    name: 'Kuda Bank',
    code: '003',
  },
];
