import clsx from 'clsx';
import { CodeInput } from 'components/form-elements/CodeInput';
import { useResendLoginOtp } from 'hooks/api/auth/useResendLoginOtp';
import { useVerifyLoginOtp } from 'hooks/api/auth/useVerifyLoginOtp';
import { useInitiateAuthSession } from 'hooks/app/useInitiateAuthSession';
import { useResetter } from 'hooks/commons/useResetter';
import { useCountdown } from 'hooks/commons/useCountdown';
import { AppToast } from 'components/primary/AppToast';
import { toast } from 'react-toastify';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { BackLine } from 'components/svgs/navigation/Arrows';

interface Props {
  email: string;
  back: () => void;
}

export const VerifyLoginOtp = ({ email, back }: Props) => {
  const { countdown, finished, resetCountdown } = useCountdown(60);

  const [clearCodeInput, setClearCodeInput] = useResetter();

  const { initiateAuthSession } = useInitiateAuthSession();

  const { isLoading, mutate } = useVerifyLoginOtp({
    onSuccess(res) {
      const { access_token, refresh_token } = res.tokens;
      initiateAuthSession(access_token, refresh_token);
    },
  });

  const { isLoading: resending, mutate: resend } = useResendLoginOtp({
    onSuccess,
  });

  function onSuccess() {
    toast(<AppToast>OTP resent successfully</AppToast>, { type: 'success' });
    setClearCodeInput(true);
    resetCountdown();
  }

  return (
    <div className={clsx('auth-container mx-auto py-8 640:py-[93px]')}>
      {isLoading && <FullScreenLoader id='VerifyLoginOtp' />}

      <button onClick={back} className='group mb-4 flex gap-1.5'>
        <BackLine className={'my-auto h-4 w-4 stroke-2 text-primary-main'} />{' '}
        <span className='my-auto text-xs font-medium group-hover:underline'>
          Back to Login
        </span>
      </button>

      <h4>Authorize login</h4>
      <div className='mt-1 max-w-[320px] text-left text-sm text-neutral-600'>
        Enter the 6 digit OTP sent to your email address to authorize login{' '}
      </div>

      <CodeInput
        autoFocus
        autoComplete='off'
        name='otp'
        type='numeric'
        charLimit={6}
        clear={clearCodeInput}
        submit={(val) =>
          mutate({
            email,
            otp: val,
          })
        }
        className='mt-8 h-14 340:h-[58px] 640:h-[72px]'
      />

      <div className='mt-10'>
        {!finished ? (
          <div className='text-left text-sm text-neutral-400'>
            Request new OTP in{' '}
            <span className='my-auto font-bold text-primary-main'>
              ({countdown})
            </span>
          </div>
        ) : (
          <div className='flex text-left text-sm text-neutral-400'>
            <span className='mr-2'>{"Didn't get the OTP"}? </span>
            {resending ? (
              <Spinner className='text-primary-main' />
            ) : (
              <button
                onClick={() => resend({ email })}
                type='button'
                id='resend-otp'
                className='text-button text-left text-sm font-bold'
              >
                Resend
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
