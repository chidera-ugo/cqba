import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Calendar } from 'components/illustrations/Calendar';
import { ChatBubbles } from 'components/illustrations/ChatBubbles';
import { NothingHere } from 'components/illustrations/NothingHere';

interface Props {
  processing?: boolean;
  icon?: 'calendar' | 'empty' | 'message';
  title?: JSX.Element;
  description?: JSX.Element;
  actionButton?: {
    action: () => void;
    text: string;
  };
}

export const SimpleInformation = ({
  title,
  actionButton,
  description,
  icon = 'message',
}: Props) => {
  return (
    <div className='y-center text-center'>
      <div className='mx-auto'>
        {icon === 'message' && <ChatBubbles />}
        {icon === 'calendar' && <Calendar />}
        {icon === 'empty' && <NothingHere />}
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
