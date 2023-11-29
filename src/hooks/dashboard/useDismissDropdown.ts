import { useEffect } from 'react';

export const useDismissDropdown = (
  wrapperId: string,
  dismiss: () => void,
  exceptedId?: string,
  disabled?: boolean
) => {
  useEffect(() => {
    if (disabled) return;

    const wrapper = document.getElementById(wrapperId);

    const handleClick = (e: any) => {
      const el = e.target as HTMLElement;
      const within = wrapper?.contains(el);
      const isCloseButton = el?.classList?.contains('dismiss-button');

      const isExceptedElement = !exceptedId
        ? false
        : el?.id.includes(exceptedId);

      if (!within && !isCloseButton && !isExceptedElement) {
        dismiss();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};
