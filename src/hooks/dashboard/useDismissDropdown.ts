import { useEffect } from 'react';

export const useDismissDropdown = (
  wrapperId: string,
  dismiss: () => void,
  exceptedId?: string

  /**
   * Values to animate to, variant label(s), or `AnimationControls`.
   *
   * ```jsx
   * // As values
   * <motion.div animate={{ opacity: 1 }} />
   * ID of an element that when clicked should not trigger the 'dismiss' action
   *
   * // As variant
   * <motion.div animate="visible" variants={variants} />
   *
   * // Multiple variants
   * <motion.div animate={["visible", "active"]} variants={variants} />
   *
   * // AnimationControls
   * <motion.div animate={animation} />
   * ```
   */
) => {
  useEffect(() => {
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
