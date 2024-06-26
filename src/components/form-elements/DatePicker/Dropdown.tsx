/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from 'framer-motion';
import React, { PropsWithChildren, useEffect } from 'react';
import clsx from 'clsx';

export type Props = JSX.IntrinsicElements['div'] & {
  close: () => void;
  show: boolean;
  wrapperId?: string;
  bottom?: boolean;
};

export function Dropdown({
  close,
  wrapperId,
  show,
  children,
  className,
  bottom,
}: PropsWithChildren<Props>) {
  useEffect(() => {
    const parent = document.getElementById(wrapperId ?? 'date-picker-wrapper');

    const handleClick = (e: any) => {
      const el = e.target as HTMLElement;
      const within = parent?.contains(el);

      if (
        !within &&
        !el.classList.contains('react-calendar__tile') &&
        el.tagName !== 'ABBR'
      ) {
        close();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      removeEventListener('click', handleClick);
    };
  }, []);

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
          y: '-20px',
          transition: {
            duration: 0,
          },
        },
      }}
      className={clsx(
        'absolute z-[100] w-full overflow-hidden rounded-xl border border-neutral-300 p-0 shadow-lg',
        bottom ? 'bottom-[100%] mb-3' : 'top-[100%] mt-3',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
