import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { CreateCardForm } from 'components/forms/cards/CreateCardForm';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';

interface Props {
  close: () => void;
}

export const CreateCard = ({ close }: Props) => {
  const { isLoading, isError, data } = useMakeDummyHttpRequest({
    method: 'get',
    res: subAccounts,
  });

  if (isLoading) return <IsLoading />;
  if (isError)
    return (
      <IsError
        title='An error occurred'
        description='Failed to get institutions'
      />
    );

  return <CreateCardForm {...{ close }} subAccounts={data!} />;
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
