import { Restrictor } from 'components/commons/Restrictor';
import { ChatBubbles } from 'components/illustrations/ChatBubbles';
import { useCurrentAccountSetupStepUrl } from 'hooks/dashboard/kyc/useCurrentAccountSetupStepUrl';
import { useRouter } from 'next/router';

export const VerifyYourAccount = () => {
  const { push } = useRouter();

  const { getCurrentAccountSetupStepUrl } = useCurrentAccountSetupStepUrl();

  return (
    <Restrictor
      icon={<ChatBubbles />}
      title='Verify your Account'
      subTitle={'You need to verify your account to use your feature'}
      action={{
        action: () => push(getCurrentAccountSetupStepUrl()),
        text: 'Continue Setup',
      }}
    />
  );
};
