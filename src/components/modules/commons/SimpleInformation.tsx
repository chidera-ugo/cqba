import clsx from 'clsx';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { PropsWithChildren, ReactNode } from 'react';

export interface Props {
  processing?: boolean;
  icon?: JSX.Element;
  title?: JSX.Element | string;
  description?: JSX.Element | string;
  actionButton?: {
    action?: () => void;
    text?: string;
  };
  className?: string;
  slot?: ReactNode;
}

export const SimpleInformation = ({
  title,
  actionButton,
  description,
  className,
  icon,
  slot,
  processing,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className={clsx('y-center text-center', className)}>
      {icon && <div className='mx-auto mb-4'>{icon}</div>}
      <h4 className='mt-0 font-semibold'>{title}</h4>
      <div className='mx-auto max-w-[640px] text-sm font-light text-neutral-600 640:text-base'>
        {description}
      </div>

      {children}

      {actionButton && (
        <div className='x-center mt-8'>
          <SubmitButton
            onClick={actionButton.action}
            type='button'
            submitting={processing}
            className='primary-button min-w-[120px]'
          >
            {actionButton.text ?? 'Try Again'}
          </SubmitButton>
        </div>
      )}

      {slot}
    </div>
  );
};
