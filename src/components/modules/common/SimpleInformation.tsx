import clsx from 'clsx';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Calendar } from 'components/illustrations/Calendar';
import { Cancel } from 'components/illustrations/Cancel';
import { ChatBubbles } from 'components/illustrations/ChatBubbles';
import { NothingHere } from 'components/illustrations/NothingHere';
import { GreenCheck } from 'components/illustrations/Success';

interface Props {
  processing?: boolean;
  icon?: 'calendar' | 'empty' | 'message' | 'success' | 'error';
  title?: JSX.Element;
  description?: JSX.Element;
  actionButton?: {
    action: () => void;
    text: string;
  };
  className?: string;
}

export const SimpleInformation = ({
  title,
  actionButton,
  description,
  icon = 'message',
  className,
}: Props) => {
  return (
    <div className={clsx('y-center text-center', className)}>
      <div className='mx-auto'>
        {icon === 'message' && <ChatBubbles />}
        {icon === 'calendar' && <Calendar />}
        {icon === 'empty' && <NothingHere />}
        {icon === 'success' && <GreenCheck />}
        {icon === 'error' && <Cancel />}
      </div>
      <h4 className='mt-4'>{title}</h4>
      <p>{description}</p>

      {actionButton && (
        <div className='x-center mt-8'>
          <SubmitButton
            onClick={actionButton.action}
            type='button'
            className='dark-button'
          >
            {actionButton.text}
          </SubmitButton>
        </div>
      )}
    </div>
  );
};
