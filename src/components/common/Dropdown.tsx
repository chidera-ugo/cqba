/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useDismissDropdown } from 'hooks/dashboard/useDismissDropdown';

type Props = {
  close: () => void;
  show: boolean;
  wrapperId: string;
  className?: string;
};

export const Dropdown = ({
  close,
  wrapperId,
  show,
  children,
  className,
}: PropsWithChildren<Props>) => {
  useDismissDropdown(wrapperId, close);

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
                duration: 0.2,
              },
            },
            hide: {
              opacity: 0,
              y: '-30%',
              transition: {
                duration: 0,
              },
            },
          }}
          className={clsx(
            'absolute top-[100%] z-20 mt-1 w-full overflow-hidden rounded-xl border border-neutral-300 p-0 shadow-lg',
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
