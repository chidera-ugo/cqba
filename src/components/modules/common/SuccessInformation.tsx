import { SubmitButton } from 'components/form-elements/SubmitButton';
import { ChatBubbles } from 'components/illustrations/ChatBubbles';

interface Props {
  processing?: boolean;
  icon: 'chat';
  title: string;
  description: string;
  actionButton: {
    action: () => void;
    text: string;
  };
}

export const SuccessInformation = ({
  title,
  actionButton,
  description,
  icon,
}: Props) => {
  return (
    <div className='y-center text-center'>
      <div className='mx-auto'>{icon === 'chat' && <ChatBubbles />}</div>
      <h4 className='mt-4'>{title}</h4>
      <p className='mt-4'>{description}</p>

      <div className='x-center mt-8'>
        <SubmitButton
          onClick={actionButton.action}
          type='button'
          className='dark-button'
        >
          {actionButton.text}
        </SubmitButton>
      </div>
    </div>
  );
};
