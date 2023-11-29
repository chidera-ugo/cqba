import { useEffect, useState } from 'react';
import { isDev } from 'constants/environmentVariables';

export const useCountdown = (
  countDownInSeconds: number,
  disabled?: boolean,
  disableSpeedUp?: boolean
) => {
  const _seconds =
    countDownInSeconds < 60
      ? countDownInSeconds
      : Math.min(countDownInSeconds, 0);

  const _minutes = Math.floor(countDownInSeconds / 60);

  const [seconds, setSeconds] = useState(_seconds);
  const [minutes, setMinutes] = useState(_minutes);

  const finished = minutes <= 0 && seconds <= 0;

  useEffect(() => {
    if (disabled || finished) return;

    const t = setInterval(
      () => {
        if (minutes >= 0) {
          if (seconds === 0) {
            setMinutes((prev) => prev - 1);
          }
          setSeconds((prev) => {
            if (prev === 0) return 59;
            return prev - 1;
          });
        }
      },
      isDev && !disableSpeedUp ? 50 : 1000
    );

    return () => clearInterval(t);
  }, [seconds, minutes, disabled, finished]);

  return {
    countdown: `${minutes >= 10 ? minutes : `0${minutes}`}:${
      seconds >= 10 ? seconds : `0${seconds}`
    }`,
    resetCountdown() {
      setSeconds(_seconds);
      setMinutes(_minutes);
    },
    seconds,
    finished,
  };
};
