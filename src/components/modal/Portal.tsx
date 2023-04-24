import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children }: PropsWithChildren<unknown>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return mounted
    ? createPortal(children, document.getElementById('portal') as HTMLElement)
    : null;
};
