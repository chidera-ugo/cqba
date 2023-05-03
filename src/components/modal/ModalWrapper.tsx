import clsx from 'clsx';
import { FC, PropsWithChildren, useState } from 'react';
import { Modal } from '.';
import { useDragControls, motion } from 'framer-motion';
import { Header, HeaderProps } from './ModalHeader';
import useMediaQuery from 'hooks/common/useMediaQuery';

export const defaultBackgroundClassname = 'bg-white';

export type ModalWrapperProps = ModalProps &
  HeaderProps & {
    hideHeader?: boolean;
    simpleHeader?: boolean;
    altHeader?: boolean;
    className?: string;
    id?: string;
    childrenClassname?: string;
  };

export type ModalProps = {
  type?: 'right' | 'left' | 'center' | 'center-top' | 'zoom' | 'fade';
  show: boolean;
  closeOnClickOutside?: boolean;
  className?: string;
  duration?: number;
  white?: boolean;
  close?: () => void;
};

export type CenteredModalWrapperProps = ModalWrapperProps & {
  fullscreen?: boolean;
  undraggable?: boolean;
  withGutter?: boolean;
  scrollable?: boolean;
  mustShowIsDraggable?: boolean;
  backgroundClassname?: string;
};

export const MobileMenuWrapper = ({
  children,
  show,
  className,
  ...rest
}: PropsWithChildren<ModalWrapperProps>) => {
  return (
    <Modal
      show={show}
      closeOnClickOutside
      className={clsx(
        'relative z-[1000] mr-auto h-full w-full max-w-[324px] 560:my-auto 640:w-auto'
      )}
      {...rest}
      type='left'
    >
      <div
        className={clsx(
          `hidden-scrollbar relative h-full w-full min-w-full overflow-clip overflow-y-auto overflow-x-hidden 640:w-auto 640:min-w-[450px]`,
          className ? className : 'bg-white px-6 560:min-w-[466px]'
        )}
      >
        <div className={clsx('560:min-w-[400px]')}>{children}</div>
      </div>
    </Modal>
  );
};

export const RightModalWrapper = ({
  children,
  show,
  hideHeader,
  className,
  childrenClassname,
  ...props
}: PropsWithChildren<ModalWrapperProps>) => {
  return (
    <Modal
      show={show}
      {...props}
      type='right'
      className={clsx(
        'thin-scrollbar relative z-[1000] ml-auto h-full w-full max-w-[598px] overflow-y-auto bg-white',
        className
      )}
    >
      <div className='h-full'>
        {!hideHeader && <Header {...props} />}
        <div className={clsx(childrenClassname ?? 'p-4 640:p-8')}>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export const CentredModalWrapper = ({
  children,
  show,
  className,
  fullscreen,
  undraggable,
  withGutter,
  mustShowIsDraggable,
  backgroundClassname,
  hideHeader,
  ...props
}: PropsWithChildren<CenteredModalWrapperProps>) => {
  const mobile = useMediaQuery('(max-width: 640px)');
  const controls = useDragControls();
  const [duration, setDuration] = useState(0.2);

  return (
    <Modal
      className={clsx(
        'y-between 640:y-center relative z-[1000] mx-auto mb-0 mt-auto h-full w-full p-0 560:my-auto 640:w-auto',
        withGutter && 'p-3'
      )}
      {...{ duration, show }}
      {...props}
      type='center'
    >
      <div className='block 640:hidden'></div>

      <motion.div
        dragListener
        dragControls={controls}
        drag={undraggable || !mobile ? false : 'y'}
        dragElastic={{
          top: 0,
          bottom: 1,
        }}
        dragMomentum={false}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragTransition={{ bounceStiffness: 600 }}
        onDragStart={() => {
          setDuration(0.1);
        }}
        onDragEnd={(_e, info) => {
          if (info.offset.y > 150) {
            props.close && props.close();
          } else {
            setDuration(0.2);
          }
        }}
        onDragTransitionEnd={() => {
          setDuration(0.2);
        }}
        className={clsx(
          `relative mt-auto h-auto w-full min-w-full overflow-clip overflow-y-auto overflow-x-hidden 640:my-4 640:min-h-min 640:w-auto 640:min-w-[450px] 640:rounded-b-2xl`,
          withGutter ? 'rounded-2xl' : 'rounded-t-2xl rounded-b-none',
          '560:min-w-[466px]',
          backgroundClassname ?? defaultBackgroundClassname,
          fullscreen &&
            'h-max min-h-screen rounded-t-none 640:max-h-[80%] 640:rounded-t-2xl'
        )}
      >
        {mobile && (props.closeOnClickOutside || mustShowIsDraggable) && (
          <div
            onPointerDown={(e) => controls.start(e)}
            className={clsx(
              'x-center sticky left-0 top-0 z-[1200] w-full rounded-t-2xl py-3',
              backgroundClassname ?? defaultBackgroundClassname
            )}
          >
            <div className='h-1.5 w-12 rounded-full bg-neutral-300 bg-opacity-50'></div>
          </div>
        )}

        {!hideHeader && props.close && (
          <>
            <div className='x-between sticky top-0 right-0 p-4 pb-0'>
              <div></div>
              <button onClick={props.close} className='text-gray-400'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-7 w-7'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          </>
        )}

        <div
          className={clsx('560:min-w-[400px]', className ?? 'px-4 640:px-8')}
        >
          {children}
        </div>
      </motion.div>
    </Modal>
  );
};

export const LargeRightModalWrapper = ({
  children,
  show,
  className,
  ...props
}: PropsWithChildren<ModalWrapperProps>) => {
  return (
    <Modal
      type='right'
      className={clsx(
        `relative z-[1000] ml-auto mt-auto h-full overflow-y-auto bg-white`,
        className ? className : 'w-[85vw]'
      )}
      {...{ show }}
    >
      <Header {...props} />
      {children}
    </Modal>
  );
};

(CentredModalWrapper as FC<CenteredModalWrapperProps>).propTypes = {
  closeOnClickOutside: function (props, propName) {
    const error = () =>
      `You must pass 'close' if you intend to use closeOnClickOutside`;

    if (typeof props[propName] === 'boolean') {
      if (!props['close']) {
        return new Error(error());
      }
    }
    return null;
  },
};
