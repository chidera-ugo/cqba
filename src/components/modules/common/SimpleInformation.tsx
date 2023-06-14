import clsx from 'clsx';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { PropsWithChildren } from 'react';

export interface Props {
  processing?: boolean;
  icon?: JSX.Element;
  title?: JSX.Element;
  description?: JSX.Element;
  actionButton?: {
    action?: () => void;
    text?: string;
  };
  className?: string;
}

export const SimpleInformation = ({
  title,
  actionButton,
  description,
  className,
  icon,
  processing,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className={clsx('y-center text-center', className)}>
      {icon && <div className='mx-auto mb-4'>{icon}</div>}
      <div className='mt-0 font-semibold'>{title}</div>
      <p className='mx-auto max-w-[640px]'>{description}</p>

      {children}

      {actionButton && (
        <div className='x-center mt-8'>
          <SubmitButton
            onClick={actionButton.action}
            type='button'
            submitting={processing}
            className='dark-button min-w-[120px]'
          >
            {actionButton.text ?? 'Try Again'}
          </SubmitButton>
        </div>
      )}
    </div>
  );
};
