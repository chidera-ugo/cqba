import { useAppContext } from 'context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Portal } from './Portal';
import { ModalProps } from './ModalWrapper';
import clsx from 'clsx';

export const Modal = ({
  children,
  type,
  show,
  closeModal,
  className,
  duration = 0.2,
  closeOnClickOutside,
  white,
  hideBackdrop,
  portalClassname,
  backdropClassname,
}: PropsWithChildren<ModalProps>) => {
  const [grow, setGrow] = useState(false);
  const screenSizes = useAppContext().state.screenSize;

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
            id={'portal-presence'}
            className={clsx(
              `disable-scrolling fixed inset-0 w-screen`,
              portalClassname ?? 'z-[1200]',
              type !== 'right' && type !== 'left' ? 'y-center' : ''
            )}
          >
            <motion.div
              initial='hide'
              animate='show'
              exit='hide'
              onClick={
                closeOnClickOutside
                  ? closeModal
                  : hideBackdrop && type !== 'center'
                  ? undefined
                  : () => setGrow(true)
              }
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
                hideBackdrop
                  ? 'bg-transparent'
                  : white
                  ? 'bg-white'
                  : backdropClassname ?? 'bg-black bg-opacity-60'
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
                    type === 'center' ||
                    (type === 'zoom' && screenSizes?.mobile)
                      ? '100%'
                      : type === 'center-top'
                      ? '-100%'
                      : 0,
                  x: type === 'right' ? '100%' : type === 'left' ? '-200%' : 0,
                  scale: type === 'zoom' && !screenSizes?.mobile ? 0.5 : 1,
                  opacity:
                    type === 'fade' ||
                    type === 'center' ||
                    (type === 'zoom' && !screenSizes?.mobile)
                      ? 0
                      : 1,
                },
              }}
              transition={{
                duration,
              }}
              id='modal-child-wrapper'
              onClick={(e: any) => {
                if (e.target.id === 'modal-child-wrapper') {
                  if (closeOnClickOutside && closeModal) {
                    closeModal();
                  } else if (!hideBackdrop && type !== 'center') {
                    setGrow(true);
                  }
                }
              }}
              className={clsx(
                className,
                grow
                  ? type === 'right'
                    ? '640:animate-slide_right'
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
