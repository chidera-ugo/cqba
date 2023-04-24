import { PropsWithChildren } from 'react';
import { ToastProps } from 'react-toastify/dist/types';
import { useToastIcon } from './useToastIcon';

export const toastClasses: Record<any, string> = {
  error: 'bg-[#FFE4E4] border-[#FFB7B7] text-red-600 border text-[#CC3A3A]',
  success: 'bg-green-50 border-green-500 border text-green-600',
  info: 'bg-[#FFF7DF] text-yellow-600 border-2 border-[#FFE7A0]',
};

export type ToastType = 'error' | 'alert' | 'information' | 'success';

interface Props {
  toastProps?: ToastProps;
  closeToast?: () => void;
  action?: () => void;
}

export const AppToast = ({
  toastProps,
  closeToast,
  children,
  action,
}: PropsWithChildren<Props>) => {
  const icon = useToastIcon(toastProps!.type);

  function handleClose() {
    closeToast!();
    if (action) action();
  }

  return (
    <div className='flex align-middle'>
      <span className='my-auto mr-2.5 flex-shrink-0'>{icon}</span>
      <div className='my-auto w-full text-xs font-semibold 640:text-sm'>
        {children}
      </div>
      <ActionButton
        actionType={action ? 'other' : 'close'}
        onClick={handleClose}
      />
    </div>
  );
};

type ActionButtonProps = JSX.IntrinsicElements['button'] & {
  actionType: 'close' | 'other';
};

export const ActionButton = ({ onClick, actionType }: ActionButtonProps) => (
  <button
    {...{ onClick }}
    className='smooth my-auto -mr-2 h-full p-2 transition-colors'
  >
    {actionType === 'close' ? (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    ) : (
      <svg
        width='24'
        height='25'
        viewBox='0 0 24 25'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9 18.5L15 12.5L9 6.5'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    )}
  </button>
);
