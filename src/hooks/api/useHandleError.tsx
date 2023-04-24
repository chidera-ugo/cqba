import { AppToast } from 'components/primary/AppToast';
import { toast } from 'react-toastify';

export const useHandleError = () => {
  const handleError = (e: any, silent?: boolean, onClick?: () => void) => {
    let message: string;

    const statusCode = e?.response?.status;
    const _message = e?.response?.data?.message;

    const supportCodes = [500, 405];

    if (supportCodes.includes(statusCode)) {
      message = `An error occurred, please contact support`;
    } else if (e.message.includes('timeout of ')) {
      message = 'Request timed out, please check your internet';
    } else if (_message) {
      if (typeof _message === 'string') {
        message = _message;
      } else {
        message = _message[0];
      }
    } else {
      message = e.message;
    }

    if (!silent) {
      toast(<AppToast action={onClick}>{message}</AppToast>, {
        type: 'error',
      });
    }
  };

  return { handleError };
};
