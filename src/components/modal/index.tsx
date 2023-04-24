import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Portal } from './Portal';
import { ModalProps } from './ModalWrapper';
import clsx from 'clsx';

export const Modal = ({
  children,
  type,
  show,
  close,
  className,
  duration = 0.3,
  closeOnClickOutside,
  white,
}: PropsWithChildren<ModalProps>) => {
  const [grow, setGrow] = useState(false);

  useEffect(() => {
    let timeout: any;
    if (grow) {
      timeout = setTimeout(() => {
        setGrow(false);
      }, 600);
    }

    return () => clearTimeout(timeout);
  }, [grow]);

  return (
    <AnimatePresence initial={false}>
      {show && (
        <Portal>
          <div
            className={clsx(
              `no-scroll fixed inset-0 z-[1200] w-screen`,
              type !== 'right' ? 'y-center' : ''
            )}
          >
            <motion.div
              initial='hide'
              animate='show'
              exit='hide'
              onClick={closeOnClickOutside ? close : () => setGrow(true)}
              variants={{
                show: {
                  opacity: 1,
                },
                hide: {
                  opacity: 0,
                },
              }}
              transition={{
                duration,
              }}
              className={clsx(
                `no-highlight absolute inset-0 h-full w-full`,
                closeOnClickOutside && 'cursor-pointer',
                white ? 'bg-white' : 'bg-black bg-opacity-75'
              )}
            />

            <motion.div
              initial='hide'
              animate='show'
              exit='hide'
              variants={{
                show: {
                  y: 0,
                  x: 0,
                  opacity: 1,
                  scale: 1,
                },
                hide: {
                  y:
                    type === 'center'
                      ? '100%'
                      : type === 'center-top'
                      ? '-100%'
                      : 0,
                  x: type === 'right' ? '100%' : 0,
                  scale: type === 'zoom' ? 0 : 1,
                  opacity: type === 'fade' ? 0 : 1,
                },
              }}
              transition={{
                duration,
              }}
              id='modal-child-wrapper'
              onClick={(e: any) => {
                if (e.target.id === 'modal-child-wrapper') {
                  if (closeOnClickOutside && close) {
                    close();
                  } else {
                    setGrow(true);
                  }
                }
              }}
              className={clsx(
                className,
                grow
                  ? type === 'right'
                    ? 'animate-slide_right'
                    : 'animate-slide_down 640:animate-grow_sm'
                  : ''
              )}
            >
              {children}
            </motion.div>
          </div>
        </Portal>
      )}
    </AnimatePresence>
  );
};
