import { AnimatePresence, motion } from 'framer-motion';
import { useDismissDropdown } from 'hooks/dashboard/useDismissDropdown';
import { InputHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = InputHTMLAttributes<HTMLDivElement> & {
  dismiss: () => void;
  show: boolean;
  wrapperId: string;
  className?: string;
  exceptedId?: string;
  anchorPosition?: 'top' | 'bottom';
  isTableAction?: boolean;
  disableCloseOnClickOutside?: boolean;
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
  style,
  disableCloseOnClickOutside,
}: PropsWithChildren<Props>) => {
  useDismissDropdown(
    wrapperId,
    dismiss,
    exceptedId,
    disableCloseOnClickOutside
  );

  return (
    <AnimatePresence>
      {show && (
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
              transform: 'scaleY(1)',
            },
            hide: {
              opacity: 0,
              y: anchorPosition === 'top' ? '5px' : '-5px',
              transform: anchorPosition === 'top' ? undefined : `scaleY(0.8)`,
              transition: {
                duration: 0.1,
              },
            },
          }}
          style={{
            transformOrigin: 'top center',
            ...style,
          }}
          className={
            !isTableAction
              ? clsx(
                  'absolute z-[200] w-full overflow-y-auto rounded-md border border-neutral-200 p-0 shadow-lg',
                  anchorPosition === 'bottom'
                    ? 'top-[100%] mt-2'
                    : 'bottom-[100%] mb-2',
                  className
                )
              : clsx(
                  'absolute z-[200] -mr-1 w-full overflow-y-auto rounded-md border border-neutral-200 p-0 shadow-lg',
                  anchorPosition === 'bottom'
                    ? 'top-[100%] -mt-5'
                    : 'bottom-[100%] -mb-5',
                  className
                )
          }
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
