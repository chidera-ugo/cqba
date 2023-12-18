import { useEffect, useRef } from 'react';

export const useLazyFocus = (id?: string, shouldFocus?: boolean) => {
  const timeout = useRef<any>(null);

  useEffect(() => {
    if (!shouldFocus) return;

    timeout.current = setTimeout(() => {
      document.getElementById(id!)?.focus();
    }, 400);

    return () => clearTimeout(timeout.current);
  }, [shouldFocus]);
};
