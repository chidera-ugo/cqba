import { Confirmation } from 'components/modals/Confirmation';
import { isDev } from 'constants/environmentVariables';
import { useDestroySession } from 'hooks/app/useDestroySession';
import { useCountdown } from 'hooks/commons/useCountdown';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import {
  getCookie,
  removeCookie,
  saveCookie,
} from 'utils/handlers/handleCookies';

export const IdleTimer = ({
  timeoutInMinutes: t,
}: {
  timeoutInMinutes?: number;
}) => {
  const { isVerified } = useIsVerified();
  const timeoutInMinutes = isVerified ? (!!t ? t : 5) : 10;

  const { destroySession } = useDestroySession();

  const [showModal, setShowModal] = useState(false);
  const { replace, query, pathname } = useRouter();
  const [enableCountdown, setEnableCountdown] = useState(false);
  const { countdown, seconds } = useCountdown(30, !enableCountdown);

  const disabled = getCookie('rememberMe')?.value === true || isDev;

  const { reset } = useIdleTimer({
    onIdle,
    onPrompt,
    timeout: timeoutInMinutes * 60 * 1000,
    promptBeforeIdle: 30 * 1000,
  });

  function onPrompt() {
    if (disabled) return;
    setEnableCountdown(true);
    setShowModal(true);
    const session = getCookie('idle_timer_session');
    if (!session || dayjs().diff(session.ends, 'seconds') > 0) handleOnIdle();
  }

  useEffect(() => {
    if (disabled) return;
    storeSession();
  }, []);

  useEffect(() => {
    if (Number(seconds) > 30) {
      handleOnIdle();
    }
  }, [seconds]);

  function storeSession() {
    saveCookie('idle_timer_session', {
      ends: dayjs()
        .add(timeoutInMinutes + 0.5, 'minutes')
        .toDate(),
    });
  }

  function handleOnIdle() {
    destroySession();
    setShowModal(false);
    removeCookie('idle_timer_session');

    replace({
      pathname,
      query,
    });
  }

  function onIdle() {
    if (disabled) return;
    handleOnIdle();
  }

  if (disabled) return <></>;

  return (
    <Confirmation
      show={showModal}
      negative={() => setShowModal(false)}
      positive={() => {
        setShowModal(false);
        reset();
        storeSession();
      }}
      buttonTexts={["Yes, I'm Here"]}
      title='Are you still here?'
      subTitle={
        <span className='text-base'>
          {`You'll be logged you out in `}{' '}
          <span className='font-bold'>{countdown}</span>{' '}
          <span className='inline-block'>{`if you don't respond`}</span>
        </span>
      }
    />
  );
};
