import clsx from 'clsx';
import { CrossSubtract } from 'components/svgs/navigation/Exit';
import { useAppContext } from 'context/AppContext';
import { FC, PropsWithChildren, useState } from 'react';
import { Modal } from '.';
import { useDragControls, motion } from 'framer-motion';
import { Header, HeaderProps } from './ModalHeader';
import useMediaQuery from 'hooks/commons/useMediaQuery';

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
  portalClassname?: string;
  closeOnClickOutside?: boolean;
  className?: string;
  backdropClassname?: string;
  duration?: number;
  white?: boolean;
  closeModal?: () => void;
  hideBackdrop?: boolean;
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
  const { user } = useAppContext().state;

  const isOwner = user?.role === 'owner';

  return (
    <Modal
      show={show}
      closeOnClickOutside
      className={clsx(
        'relative z-[1000] mr-auto h-full w-full 560:my-auto 640:w-auto 640:max-w-[324px]'
      )}
      {...rest}
      type='left'
    >
      <div
        className={clsx(
          `hidden-scrollbar relative h-full w-full min-w-full overflow-clip overflow-y-auto overflow-x-hidden 640:w-auto 640:min-w-[450px]`,
          className
            ? className
            : isOwner
            ? 'w-full bg-neutral-100'
            : 'w-full bg-neutral-1000'
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
        'thin-scrollbar relative z-[1000] ml-auto h-full w-full max-w-[520px] overflow-y-auto bg-white',
        className
      )}
    >
      <div className='h-full'>
        {!hideHeader && <Header {...props} />}

        <div className={clsx(childrenClassname ?? 'p-4 640:p-8')}>
          {children}
          <div className='h-10'></div>
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
  mustShowIsDraggable: _,
  backgroundClassname,
  hideHeader,
  type = 'center',
  ...props
}: PropsWithChildren<CenteredModalWrapperProps>) => {
  const mobile = useMediaQuery('(max-width: 640px)');
  const controls = useDragControls();
  const [duration, setDuration] = useState(0.2);

  return (
    <Modal
      className={clsx(
        'y-between 640:y-center relative z-[1000] mx-auto mb-0 mt-auto w-full p-0 640:my-auto 640:w-auto',
        withGutter && 'p-3'
      )}
      {...{ duration, show }}
      {...props}
      type={type}
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
            props.closeModal && props.closeModal();
          } else {
            setDuration(0.2);
          }
        }}
        onDragTransitionEnd={() => {
          setDuration(0.2);
        }}
        className={clsx(
          `relative mt-auto h-auto w-full min-w-full overflow-clip overflow-y-auto overflow-x-hidden 640:my-4 640:min-h-min 640:w-auto 640:min-w-[450px] 640:rounded-b-xl`,
          withGutter ? 'rounded-xl' : 'rounded-t-xl rounded-b-none',
          '560:min-w-[466px]',
          backgroundClassname ?? defaultBackgroundClassname,
          fullscreen &&
            'h-max min-h-screen overflow-hidden rounded-t-none 640:max-h-[80%] 640:rounded-t-xl'
        )}
      >
        <div className='sticky top-0 left-0 z-[1200] rounded-t-xl'>
          {!hideHeader && props.closeModal && (
            <div className='x-between bg-white p-4'>
              <h5>{props.title}</h5>
              <button
                onClick={props.closeModal}
                className='text-gray-400 hover:text-red-500'
              >
                <CrossSubtract className={'h-7 w-7'} />
              </button>
            </div>
          )}
        </div>

        <div
          className={clsx(
            'overflow-y-auto 560:min-w-[400px] 640:pb-0',
            className ?? 'px-4 640:px-8'
          )}
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
  childrenClassname,
  ...props
}: PropsWithChildren<ModalWrapperProps>) => {
  return (
    <Modal
      type='right'
      className={clsx(
        `relative z-[1000] ml-auto mt-auto h-full overflow-y-auto bg-white`,
        className ? className : 'w-[85vw]'
      )}
      {...props}
      {...{ show }}
    >
      <Header {...props} />
      <div className={clsx(childrenClassname ?? 'p-4 640:p-8')}>{children}</div>
    </Modal>
  );
};

(CentredModalWrapper as FC<CenteredModalWrapperProps>).propTypes = {
  closeOnClickOutside: function (props, propName) {
    const error = () =>
      `You must pass 'closeModal' if you intend to use closeOnClickOutside`;

    if (typeof props[propName] === 'boolean') {
      if (!props['closeModal']) {
        return new Error(error());
      }
    }
    return null;
  },
};
