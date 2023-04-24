import { useEffect } from 'react';

export const useDismissDropdown = (wrapperId: string, close: () => void) => {
  useEffect(() => {
    const wrapper = document.getElementById(wrapperId);

    const handleClick = (e: any) => {
      const el = e.target as HTMLElement;
      const within = wrapper?.contains(el);
      const isCloseButton = el?.classList?.contains('close-button');

      if (!within && !isCloseButton) {
        close();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};
