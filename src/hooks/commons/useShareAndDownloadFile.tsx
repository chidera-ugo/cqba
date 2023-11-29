import { AppToast } from 'components/primary/AppToast';
import { useShareDialog } from 'hooks/commons/useShareDialog';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const useShareAndDownloadFile = () => {
  const RECEIPT_TITLE = `CHEQUEBASE_RECEIPT.jpg`;

  let canvas: HTMLCanvasElement;

  const [processing, setProcessing] = useState(false);

  const ref = useRef<any>(null);

  const { openShareDialog } = useShareDialog();

  function handleDismiss() {
    setProcessing(false);
  }

  async function handleDownloadFile() {
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

    handleDismiss();
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

  return {
    ref,
    handleShareFile,
    handleDownloadFile,
    processing,
  };
};
