import { AppToast } from 'components/primary/AppToast';
import { toast } from 'react-toastify';

export const useCopyToClipboard = () => {
  return {
    async copyToClipboard(text: string, successMessage: string) {
      navigator?.clipboard?.writeText(text).then(() => {
        toast(<AppToast>{successMessage}</AppToast>, {
          type: 'info',
          autoClose: 1000,
        });
      });
    },
  };
};
