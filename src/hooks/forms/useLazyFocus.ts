import { useEffect, useRef } from 'react';

export const useLazyFocus = (id?: string, lazyFocus?: boolean) => {
  const timeout = useRef<any>(null);

  useEffect(() => {
    if (!lazyFocus) return;

    timeout.current = setTimeout(() => {
      document.getElementById(id!)?.focus();
    }, 400);

    return () => clearTimeout(timeout.current);
  }, [lazyFocus]);
};
