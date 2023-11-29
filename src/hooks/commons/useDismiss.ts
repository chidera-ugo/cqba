import dayjs from 'dayjs';
import { useState } from 'react';
import { getCookie, saveCookie } from 'utils/handlers/handleCookies';

export const useDismiss = (key: string, durationInMinutes?: number) => {
  const _key = `dismissed_${key}`;
  const [isDismissed, setIsDismissed] = useState(false);

  function checkIsDismissed(id?: string) {
    return getCookie(_key)?.[id ?? 'dismissed'] === true;
  }

  function getExistingValue() {
    try {
      const existingString = getCookie(_key);
      if (!existingString) return {};
      return existingString;
    } catch (error) {
      return {};
    }
  }

  function dismiss(id?: string) {
    saveCookie(
      _key,
      {
        ...getExistingValue(),
        [id ?? 'dismissed']: true,
      },
      durationInMinutes
        ? dayjs().add(durationInMinutes, 'minutes').toDate()
        : undefined
    );

    setIsDismissed(checkIsDismissed(id));
  }

  return [dismiss, isDismissed, checkIsDismissed] as const;
};
