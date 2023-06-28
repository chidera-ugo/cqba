/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useDismissDropdown } from 'hooks/dashboard/useDismissDropdown';

type Props = {
  dismiss: () => void;
  show: boolean;
  wrapperId: string;
  className?: string;
  exceptedId?: string;
  anchorPosition?: 'top' | 'bottom';
};

/**
 * Dropdown component
 * @param {function} dismiss - The function to be called when closing the dropdown
 * @param wrapperId
 * @param {string} exceptedId- The ID of an element that when clicked on shouldn't trigger the dismiss action
 * @param anchorPosition
 * @param show
 * @param children
 * @param className
 * @returns {JSX.Element} The rendered Dropdown element.
 */
export const Dropdown = ({
  dismiss,
  wrapperId,
  exceptedId,
  anchorPosition = 'bottom',
  show,
  children,
  className,
}: PropsWithChildren<Props>) => {
  useDismissDropdown(wrapperId, dismiss, exceptedId);

  if (!show) return <></>;

  return (
    <motion.div
      initial='hide'
      animate='show'
      exit='hide'
      variants={{
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.1,
          },
        },
        hide: {
          opacity: 0,
          y: anchorPosition === 'top' ? '5px' : '-5px',
          transition: {
            duration: 0,
          },
        },
      }}
      className={clsx(
        'absolute z-[100] w-full overflow-hidden rounded-xl border border-neutral-300 p-0 shadow-lg',
        anchorPosition === 'bottom' ? 'top-[100%] mt-0' : 'bottom-[100%] mb-2',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
