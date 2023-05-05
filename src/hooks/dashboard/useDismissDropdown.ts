import { useEffect } from 'react';

export const useDismissDropdown = (
  wrapperId: string,
  close: () => void,
  exceptedId?: string
) => {
  useEffect(() => {
    const wrapper = document.getElementById(wrapperId);

    const handleClick = (e: any) => {
      const el = e.target as HTMLElement;
      const within = wrapper?.contains(el);
      const isCloseButton = el?.classList?.contains('close-button');
      const isExceptedElement = !exceptedId
        ? false
        : el?.id.includes(exceptedId);

      if (!within && !isCloseButton && !isExceptedElement) {
        close();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};
