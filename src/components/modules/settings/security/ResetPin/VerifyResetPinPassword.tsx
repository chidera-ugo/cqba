import { CodeInput } from 'components/form-elements/CodeInput';
import { AppToast } from 'components/primary/AppToast';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useResetter } from 'hooks/common/useResetter';
import { useCountdown } from 'hooks/common/useCountdown';
import { useState } from 'react';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { toast } from 'react-toastify';

interface Props {
  password: string;
  next: (otp: string) => void;
}

export const VerifyResetPinPassword = ({ password, next }: Props) => {
  const { countdown, finished, resetCountdown } = useCountdown(60);

  const [clearCodeInput, setClearCodeInput] = useResetter();

  const { isLoading: resending, mutate: resendOtp } = useMakeDummyHttpRequest({
    onSuccess,
  });

  function onSuccess() {
    toast(<AppToast>OTP resent successfully</AppToast>, { type: 'success' });
    setClearCodeInput(true);
    resetCountdown();
  }

  const [otp, setOtp] = useState('');

  return (
    <div>
      <CodeInput
        autoFocus
        autoComplete='off'
        name='otp'
        type='numeric'
        charLimit={6}
        clear={clearCodeInput}
        submit={(otp) => {
          setOtp(otp);
        }}
        className='mt-4 h-[54px] 768:h-[68px]'
      />

      <button
        type='button'
        onClick={() => next(otp)}
        className='dark-button mt-5'
      >
        Continue
      </button>

      <div className='x-center mt-8'>
        {!finished ? (
          <div className='text-left text-sm text-neutral-400'>
            Request new OTP in{' '}
            <span className='my-auto font-bold text-black'>({countdown})</span>
          </div>
        ) : (
          <div className='flex text-center text-sm text-neutral-400'>
            <span className='mr-2'>{"Didn't get the OTP"}? </span>
            {resending ? (
              <Spinner className='text-black' />
            ) : (
              <button
                onClick={() => resendOtp({ password })}
                type='button'
                id='resend-otp'
                className='text-link text-left text-sm font-bold'
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
