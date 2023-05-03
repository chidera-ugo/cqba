import { Pill } from 'components/common/Pill';
import { Home } from 'components/svgs/wallet/Icons_FundWallet';
import { useRef } from 'react';
import { TransactionHistoryEntry } from 'types/Transaction';
import { formatAmount } from 'utils/helpers/formatters/formatAmount';
import { formatDate } from 'utils/helpers/formatters/formatDate';
import html2canvas from 'html2canvas';
import { useShareDialog } from 'hooks/common/useShareDialog';
import { AppToast } from 'components/primary/AppToast';
import { toast } from 'react-toastify';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { useResetter } from 'hooks/common/useResetter';

interface Props {
  transaction: TransactionHistoryEntry;
}

export const TransactionDetails = ({ transaction }: Props) => {
  const { accountName, amount, createdAt, id, status, type } = transaction;
  const [processing, setProcessing] = useResetter();
  const ref = useRef<any>(null);

  const { openShareDialog } = useShareDialog();

  const transactionDetails: { name: string; value: string | JSX.Element }[] = [
    {
      name: 'Reference',
      value: id,
    },
    {
      name: 'Date/Time',
      value: formatDate(createdAt, 'full'),
    },
    {
      name: 'Type',
      value: type,
    },
    {
      name: 'Status',
      value: (
        <Pill
          config={{
            success: 'successful',
            pending: 'pending',
          }}
          value={status}
        />
      ),
    },
  ];

  async function handleShareReceipt() {
    setProcessing(true);

    const canvas = await html2canvas(ref.current),
      data = canvas.toDataURL('image/jpeg');

    canvas.toBlob(handleShare, 'image/jpeg', 1);

    async function handleShare(blob: Blob | null) {
      if (!blob) return;

      const receiptTitle = `CHEQUEBASE_RECEIPT_${id}.jpg`;
      const file = new File([blob], receiptTitle, { type: blob.type });

      await openShareDialog(
        {
          files: [file],
        },
        () => {
          const link = document.createElement('a');

          link.href = data;
          link.download = receiptTitle;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          toast(<AppToast>Downloading receipt...</AppToast>, {
            type: 'info',
          });
        }
      );
    }
  }

  return (
    <>
      <div ref={ref} className='p-5'>
        <div className='y-center rounded-2xl bg-neutral-100 p-5'>
          <div className='x-center'>
            <span className='y-center h-10 w-10 rounded-full bg-[#BDE6FC59] text-primary-main 640:h-12 640:w-12'>
              <div className='mx-auto'>
                <Home />
              </div>
            </span>
          </div>

          <div className='text-center'>
            <div className='mt-2 font-normal text-neutral-500'>
              You sent {accountName}
            </div>
            <div className='text-2xl font-semibold text-neutral-980 640:text-3xl'>
              NGN {formatAmount({ value: amount, decimalPlaces: 2 })}
            </div>
          </div>
        </div>

        <div className='mt-8'>
          {transactionDetails.map(({ name, value }) => {
            return (
              <div
                key={name}
                className='x-between h-14 border-t border-gray-100'
              >
                <div className='my-auto text-neutral-400'>{name}</div>
                <div className='my-auto capitalize text-neutral-980'>
                  {value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='p-5 pt-0'>
        <SubmitButton
          submitting={processing}
          type='button'
          onClick={handleShareReceipt}
          className='secondary-button mt-8 h-12 w-full'
        >
          Share Receipt
        </SubmitButton>
      </div>
    </>
  );
};
