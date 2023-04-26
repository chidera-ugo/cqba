import dayjs from 'dayjs';
import { useState } from 'react';
import { getCookie, saveCookie } from 'utils/helpers/handleCookies';

export const useDismiss = (key: string, durationInMinutes?: number) => {
  const _key = `dismissed_${key}`;
  const [isDismissed, setIsDismissed] = useState(false);

  function checkIsDismissed(id?: string) {
    return getCookie(_key)?.[id ?? 'value'] === true;
  }

  function dismiss(id?: string) {
    saveCookie(
      _key,
      {
        [id ?? 'value']: true,
      },
      durationInMinutes
        ? dayjs().add(durationInMinutes, 'minutes').toDate()
        : undefined
    );

    setIsDismissed(checkIsDismissed(id));
  }

  return [dismiss, isDismissed, checkIsDismissed] as const;
};
