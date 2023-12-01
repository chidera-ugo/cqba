import { AppToast } from 'components/primary/AppToast';
import { toast } from 'react-toastify';

export const useHandleError = () => {
  const handleError = (e: any, silent?: boolean, onClick?: () => void) => {
    let message: string;

    const statusCode = e?.response?.data?.statusCode;

    const _message = e?.response?.data?.message;
    const errors = e?.response?.data?.errors;

    const statusCodesForWhichToContactSupport = [500, 405, 403];

    if (typeof e == 'string') {
      message = e;
    } else if (statusCodesForWhichToContactSupport.includes(statusCode)) {
      message = `An error occurred, please contact support`;
    } else if (e?.message?.includes('timeout of ')) {
      message = 'Request timed out, please check your internet';
    } else if (!!errors?.length) {
      const arr: string[] = [];

      for (const i of errors) {
        if (!!i.message) {
          arr.push(i.message);
        }
      }

      message = arr.join(', ');
    } else if (!_message) {
      message = e?.message;
    } else if (typeof _message === 'string') {
      message = _message;
    } else {
      message = _message[0];
    }

    if (!silent && message !== 'service_unavailable') {
      toast(<AppToast action={onClick}>{message}</AppToast>, {
        type: 'error',
      });
    }
  };

  return { handleError };
};
