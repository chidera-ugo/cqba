/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

export const useResetter = (timeOut?: number, shouldNotAutoReset?: boolean) => {
  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    let timeout: any;
    if (shouldReset && !shouldNotAutoReset) {
      timeout = setTimeout(() => {
        setShouldReset(false);
      }, timeOut ?? 600);
    }

    return () => clearTimeout(timeout);
  }, [shouldReset]);

  return [shouldReset, setShouldReset] as const;
};
