import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren, useEffect, useState } from 'react';

export const useSimpleToast = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout: any;

    if (show!) {
      timeout = setTimeout(() => {
        setShow(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [show]);

  return { show, setShow };
};

interface Props {
  show: boolean;
  className?: string;
}

export const SimpleToast = ({
  show,
  children,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial='hide'
          animate='show'
          exit='hide'
          variants={{
            show: {
              y: 0,
              opacity: 1,
            },
            hide: {
              y: 20,
              opacity: 0,
            },
          }}
          transition={{
            duration: 0.3,
          }}
          className={clsx(
            'x-center pointer-events-none fixed z-[1000] w-full',
            className ?? 'bottom-32 left-0'
          )}
        >
          <span className='via-gray-650 y-center mx-auto my-auto flex w-auto rounded-full bg-gradient-to-r from-gray-900 to-gray-500 px-4 text-center text-xs font-medium text-white'>
            {children}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
