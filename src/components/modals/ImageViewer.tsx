import clsx from 'clsx';
import { Modal } from 'components/modal';
import { ModalWrapperProps } from 'components/modal/ModalWrapper';
import { Cross } from 'components/svgs/navigation/Exit';
import { ZoomIn, ZoomOut } from 'components/svgs/others/Zoom';
import { useAppContext } from 'context/AppContext';
import { PropsWithChildren, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export const ImageViewer = ({
  children /*
  Usage: If "children" is passed then it is a multi-image viewer with the image picker on the left
  */,
  show,
  closeModal,
  image,
  title,
}: PropsWithChildren<
  ModalWrapperProps & {
    image: string;
    title?: string;
  }
>) => {
  const [scale, setScale] = useState(1);
  const { screenSize } = useAppContext().state;

  return (
    <Modal
      type={screenSize?.['mobile'] ? 'center' : 'fade'}
      {...{
        closeModal,
        show,
      }}
      closeOnClickOutside
      className='relative z-[1000] mt-auto max-w-[740px] rounded-t-2xl bg-white 640:m-4 640:rounded-b-2xl 768:mx-auto 768:mt-0'
    >
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        doubleClick={{
          step: 2,
          mode: scale === 2 ? 'reset' : 'zoomIn',
        }}
        initialPositionY={0}
        maxScale={2}
        onTransformed={(_, { scale }) => {
          setScale(scale);
        }}
      >
        {({ zoomIn, resetTransform }) => {
          return (
            <div className='mx-auto h-full w-full'>
              <div
                className={clsx(
                  'relative h-full w-full grid-cols-2',
                  children && '640:grid'
                )}
              >
                <div className='y-center absolute right-2 top-2 gap-3 880:-right-12 880:top-0'>
                  <button
                    onClick={closeModal}
                    className='y-center smooth top-0 z-[1000] rounded-full bg-black p-1 text-white transition-colors hover:bg-red-500 hover:text-white 880:bg-white 880:text-neutral-400'
                  >
                    <div className='mx-auto'>
                      <Cross className='h-5 w-5 640:h-6 640:w-6' />
                    </div>
                  </button>
                </div>

                {children && (
                  <div className='y-center border-r border-neutral-300 p-5 768:p-10'>
                    {children}
                  </div>
                )}

                <div
                  className={clsx(
                    'y-between overflow-hidden rounded-l-2xl rounded-r-2xl bg-white',
                    children && '640:rounded-l-none'
                  )}
                >
                  {title && (
                    <div className='my-auto pb-2 pt-3 text-center text-base font-semibold'>
                      {title}
                    </div>
                  )}

                  <div
                    className={clsx(
                      'x-center mx-auto h-full cursor-grab',
                      !children && '640:min-w-[640px]'
                    )}
                  >
                    <TransformComponent
                      contentStyle={{
                        width: '100%',
                        height: '440px',
                      }}
                      wrapperStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <img
                        src={image}
                        alt='document-preview'
                        className='mx-auto h-full w-full object-contain'
                      />
                    </TransformComponent>
                  </div>

                  {children && (
                    <div
                      className={clsx(
                        'x-between sticky bottom-0 left-0 z-[50] h-16 w-full rounded-r-2xl bg-white px-5'
                      )}
                    >
                      <div className='my-auto flex gap-2'>
                        <button
                          onClick={() => zoomIn()}
                          type='button'
                          className='x-center h-10 w-10'
                        >
                          <div className='my-auto'>
                            <ZoomIn className={clsx('h-7 w-7')} />
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            resetTransform();
                          }}
                          type='button'
                          className='x-center h-10 w-10'
                        >
                          <div className='my-auto'>
                            <ZoomOut className={clsx('h-7 w-7')} />
                          </div>
                        </button>
                      </div>

                      <div className='y-center'>
                        <div className='rounded-full bg-black px-2 py-1 text-sm text-white'>
                          {(scale * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </TransformWrapper>
    </Modal>
  );
};
