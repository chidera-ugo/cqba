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
  };

export type ModalProps = {
  type?: 'right' | 'center' | 'center-top' | 'zoom' | 'fade';
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
        'relative z-[1000] mx-auto mb-0 h-full w-full 560:my-auto 640:w-auto'
      )}
      {...rest}
      type='center-top'
    >
      <div
        className={clsx(
          `hidden-scrollbar relative h-auto w-full min-w-full overflow-clip overflow-y-auto overflow-x-hidden 640:my-4 640:min-h-min 640:w-auto 640:min-w-[450px]`,
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
  simpleHeader,
  ...props
}: PropsWithChildren<ModalWrapperProps>) => {
  return (
    <Modal
      show={show}
      {...props}
      type='right'
      className={clsx(
        'relative z-[1000] ml-auto mt-auto h-full w-full overflow-y-auto bg-white dark:bg-black',
        className ? className : 'max-w-[598px]'
      )}
    >
      {!hideHeader && <Header {...props} />}
      {simpleHeader && (
        <>
          <button
            onClick={() => props.close && props.close()}
            type='button'
            className='smooth y-center text-neutral-750 absolute right-4 top-4 h-10 w-10 rounded-full bg-neutral-300 hover:text-red-500'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              className='mx-auto h-4 w-4'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.58934 4.41083C5.2639 4.08539 4.73626 4.08539 4.41083 4.41083C4.08539 4.73626 4.08539 5.2639 4.41083 5.58934L8.82158 10.0001L4.41085 14.4108C4.08541 14.7363 4.08541 15.2639 4.41085 15.5893C4.73629 15.9148 5.26392 15.9148 5.58936 15.5893L10.0001 11.1786L14.4108 15.5893C14.7363 15.9148 15.2639 15.9148 15.5893 15.5893C15.9148 15.2639 15.9148 14.7363 15.5893 14.4108L11.1786 10.0001L15.5894 5.58934C15.9148 5.2639 15.9148 4.73626 15.5894 4.41083C15.2639 4.08539 14.7363 4.08539 14.4109 4.41083L10.0001 8.82158L5.58934 4.41083Z'
                fill='currentColor'
              />
            </svg>
          </button>
        </>
      )}

      <div className={`px-[52px] pt-3 pb-8`}>{children}</div>
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
  ...props
}: PropsWithChildren<CenteredModalWrapperProps>) => {
  const mobile = useMediaQuery('(max-width: 640px)');
  const controls = useDragControls();
  const [duration, setDuration] = useState(0.3);

  return (
    <Modal
      className={clsx(
        'relative z-[1000] mx-auto mb-0 mt-auto flex h-full w-full flex-col justify-between p-0 align-middle 560:my-auto 640:mt-10 640:w-auto',
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
            setDuration(0.4);
          }
        }}
        onDragTransitionEnd={() => {
          setDuration(0.4);
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
