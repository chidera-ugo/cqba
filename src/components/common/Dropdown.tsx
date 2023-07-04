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
  isTableAction?: boolean;
};

export const Dropdown = ({
  dismiss,
  wrapperId,
  exceptedId,
  anchorPosition = 'bottom',
  show,
  children,
  className,
  isTableAction,
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
      className={
        !isTableAction
          ? clsx(
              'absolute z-[100] w-full overflow-hidden rounded-xl border border-neutral-300 p-0 shadow-lg',
              anchorPosition === 'bottom'
                ? 'top-[100%] mt-2'
                : 'bottom-[100%] mb-2',
              className
            )
          : clsx(
              'absolute z-[100] -mr-1 w-full overflow-hidden rounded-xl border border-neutral-300 p-0 shadow-lg',
              anchorPosition === 'bottom'
                ? 'top-[100%] -mt-5'
                : 'bottom-[100%] -mb-5',
              className
            )
      }
    >
      {children}
    </motion.div>
  );
};
