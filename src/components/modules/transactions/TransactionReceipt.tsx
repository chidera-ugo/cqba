import { clsx } from 'clsx';
import { Pill } from 'components/commons/Pill';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { FullLogo, Icon } from 'components/svgs/Chequebase';
import { useGetWalletTransactionById } from 'hooks/api/wallet/useGetWalletTransactionById';
import { useShareAndDownloadFile } from 'hooks/commons/useShareAndDownloadFile';
import { Fragment } from 'react';
import { convertAmountToWords } from 'utils/converters/convertAmountToWords';
import { formatAmount } from 'utils/formatters/formatAmount';
import { formatDate } from 'utils/formatters/formatDate';
import QRCode from 'react-qr-code';

export const TransactionReceipt = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const { isLoading, isError, data } =
    useGetWalletTransactionById(transactionId);

  const { ref, processing, handleShareFile } = useShareAndDownloadFile();

  if (isLoading) return <IsLoading />;

  if (isError)
    return (
      <IsError
        className={'py-10'}
        description={'Failed to get transaction details'}
      />
    );

  const amount = 33318154;

  const {
    reference,
    // amount,
    status,
    type,
    meta,
    narration,
    createdAt,
    budget,
    currency,
  } = data;

  const debitPayload = [
    {
      title: 'Receiver',
      value: meta?.counterparty?.accountName,
    },
    {
      title: 'Account Number',
      value: meta?.counterparty?.accountNumber,
    },
    { title: 'Receiving Bank', value: meta?.counterparty?.bankName },
  ];

  const payload = [
    {
      title: 'Sender',
      value: meta?.sourceAccount?.accountName,
    },
    ...(type === 'debit' ? debitPayload : []),
    {
      title: 'Budget Category',
      value: budget?.name,
    },
    {
      title: 'Transaction Ref',
      value: reference,
    },
    {
      title: 'Remark',
      value: narration,
    },
    {
      title: 'Transaction Date',
      value: formatDate(createdAt, 'semi-full'),
    },
  ];

  const ReceiptContent = () => {
    return (
      <>
        <h1 className={clsx('my-1 text-3xl font-semibold')}>
          {currency}{' '}
          {formatAmount({
            value: amount / 100,
            decimalPlaces: 2,
          })}
        </h1>

        <p className={'mt-3 text-sm capitalize text-neutral-600'}>
          {convertAmountToWords((amount / 100).toFixed(2), 'NAIRA', 'KOBO')}
        </p>

        <Pill
          className={'mt-3'}
          config={{
            failed: 'failed',
            success: 'successful',
            pending: 'pending',
          }}
          value={status}
        />

        <div className='mt-7'>
          {payload.map(({ title, value }) => {
            if (!value) return <Fragment key={title} />;

            return (
              <div
                className={clsx(
                  'group relative w-full gap-10 border-neutral-300 py-2 text-xs 640:text-sm'
                )}
                key={title}
              >
                <div className='flex-shrink-0 text-sm font-light text-neutral-500'>
                  {title}
                </div>

                <div className='mt-0.5 flex'>
                  <div
                    className={clsx(
                      'my-auto text-right text-base font-medium text-black'
                    )}
                  >
                    <span
                      className={clsx(
                        'my-auto break-words break-all text-right'
                      )}
                    >
                      {value ?? '---'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className={'relative m-5'}>
      <div className={'card relative overflow-clip'}>
        <div ref={ref} className='absolute left-[700px] top-0 min-w-[640px]'>
          <div className='p-6'>
            <div className='x-between mb-10'>
              <div>
                <h2 className={'font-semibold text-black'}>Receipt</h2>
                <p className={'mt-1 text-sm font-medium'}>
                  {formatDate(createdAt, 'full')}
                </p>
              </div>

              <div className='mt-3'>
                <FullLogo />
              </div>
            </div>

            <ReceiptContent />
          </div>

          <div className='mt-4 bg-neutral-100 p-6'>
            <div className='x-between'>
              <h1
                className={
                  '-mt-5 text-[40px] font-semibold leading-10 text-black'
                }
              >
                {`Manage`}
                <span className={'block'}>{`Your Brand's`}</span>
                <span className={'block text-primary-main'}>Expenses</span>
              </h1>

              <div className='relative'>
                <div className='y-center absolute left-0 top-0 h-full w-full'>
                  <div className='y-center relative mx-auto h-9 w-9 rounded bg-neutral-100'>
                    <div className='mx-auto'>
                      <Icon />
                    </div>
                  </div>
                </div>

                <QRCode size={124} value={'https://chequebase.com/signup'} />
              </div>
            </div>

            <p className='mt-5 text-justify text-[10px] font-normal leading-[16px] text-neutral-400'>
              {`Your transfer has been successful and the beneficiary's account will be credited. However, this does not serve as confirmation of credit into the beneficiary's account. Due to the nature of the internet, transactions may be subject to interruption, transmission blackout, delayed transmission and incorrect data transmission. The Bank is not liable for malfunctions in communications facilities not within its control that may affect the accuracy or timeliness of messages and transactions you send. All transactions are subject to verification and our normal fraud checks`}
            </p>
          </div>
        </div>

        <ReceiptContent />
      </div>

      <div className='x-center mt-5'>
        <SubmitButton
          submitting={processing}
          onClick={handleShareFile}
          className='secondary-button flex'
        >
          <span className='my-auto mr-1.5 text-xs font-medium'>
            Share Receipt
          </span>

          <div className='my-auto'>
            <svg
              width='19'
              height='18'
              viewBox='0 0 19 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.2 4.0498C12.2 2.80716 13.2074 1.7998 14.45 1.7998C15.6927 1.7998 16.7 2.80716 16.7 4.0498C16.7 5.29245 15.6927 6.2998 14.45 6.2998C13.8149 6.2998 13.2413 6.03666 12.8322 5.61345L6.772 8.64354C6.79046 8.75958 6.80005 8.87857 6.80005 8.9998C6.80005 9.12106 6.79046 9.24008 6.77199 9.35614L12.8321 12.3862C13.2412 11.963 13.8149 11.6998 14.45 11.6998C15.6927 11.6998 16.7 12.7072 16.7 13.9498C16.7 15.1924 15.6927 16.1998 14.45 16.1998C13.2074 16.1998 12.2 15.1924 12.2 13.9498C12.2 13.8286 12.2096 13.7096 12.2281 13.5935L6.16792 10.5635C5.75881 10.9867 5.18516 11.2498 4.55005 11.2498C3.30741 11.2498 2.30005 10.2424 2.30005 8.9998C2.30005 7.75716 3.30741 6.7498 4.55005 6.7498C5.18519 6.7498 5.75886 7.01297 6.16797 7.43621L12.2281 4.40614C12.2096 4.29008 12.2 4.17106 12.2 4.0498Z'
                fill='#1A44ED'
              />
            </svg>
          </div>
        </SubmitButton>
      </div>
    </div>
  );
};
