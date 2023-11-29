import { AppToast } from 'components/primary/AppToast';
import { DownloadIcon, ImageIcon } from 'components/svgs/ReceiptIcons';
import { Spinner } from 'components/svgs/Spinner';
import { useShareDialog } from 'hooks/commons/useShareDialog';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const useShareAndDownloadFile = () => {
  const RECEIPT_TITLE = `AKU_RECEIPT.jpg`;

  let canvas: HTMLCanvasElement;

  const [processing, setProcessing] = useState(false);

  const ref = useRef<any>(null);

  const { openShareDialog } = useShareDialog();

  function handleDismiss() {
    setProcessing(false);
  }

  async function handleShareFile() {
    setProcessing(true);

    canvas = await html2canvas(ref.current);

    canvas.toBlob(handleShare, 'image/jpeg', 1);

    async function handleShare(blob: Blob | null) {
      if (!blob) return;

      const file = new File([blob], RECEIPT_TITLE, { type: blob.type });

      handleDismiss();

      await openShareDialog(
        {
          files: [file],
        },
        handleDownloadFile
      );
    }
  }

  async function handleDownloadFile(standalone?: boolean) {
    const link = document.createElement('a');

    if (!canvas) canvas = await html2canvas(ref.current);

    link.href = canvas.toDataURL('image/jpeg');
    link.download = RECEIPT_TITLE;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast(<AppToast>Downloading receipt...</AppToast>, {
      type: 'info',
    });

    if (!standalone) return;

    handleDismiss();
  }

  const actions: {
    title: string;
    icon: JSX.Element;
    action?: () => void;
  }[] = [
    {
      title: 'Share Image',
      icon: <ImageIcon className='h-4 w-4' />,
      action: handleShareFile,
    },
    {
      title: 'Download',
      icon: <DownloadIcon className='h-4 w-4' />,
      action: () => handleDownloadFile(true),
    },
  ];

  return {
    ref,
    actions: (
      <div className='x-center sticky top-14 z-10 mb-5 mt-5 gap-2'>
        {processing && (
          <div className='y-center absolute right-0 top-20 h-full w-full'>
            <div className='mx-auto rounded-xl bg-black bg-opacity-40 p-5'>
              <Spinner className='mx-auto h-10 w-10 text-white' />
            </div>
          </div>
        )}

        {actions.map(({ title, icon, action }) => {
          return (
            <button
              key={title}
              onClick={action}
              className='flex h-9 rounded-full border border-neutral-300 bg-white px-3 text-neutral-700 shadow-sm 340:h-10'
            >
              <div className='my-auto'>{icon}</div>

              <span className='my-auto ml-1.5 text-xs font-medium'>
                {title}
              </span>
            </button>
          );
        })}
      </div>
    ),
  };
};
