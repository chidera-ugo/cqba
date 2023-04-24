import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface Props {
  show: boolean;
  className?: string;
  title: string;
}

export const Tooltip = ({
  show,
  className,
  children,
  title,
}: PropsWithChildren<Props>) => {
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
            },
            hide: {
              opacity: 0,
            },
          }}
          transition={{
            duration: 0.2,
          }}
          className='hidden-scrollbar my-auto ml-8 max-h-[104px] w-max max-w-[320px] overflow-y-scroll rounded-xl bg-primary-main p-3 text-white'
          style={{
            top: '-100%',
            left: '100%',
          }}
        >
          <svg
            width='12'
            height='20'
            viewBox='0 0 12 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='absolute'
            style={{
              top: 'calc(50% - 10px)',
              left: 32,
            }}
          >
            <path
              d='M0.374422 9.63971C0.170005 9.83641 0.170005 10.1636 0.374421 10.3603L8.15331 17.8455C8.47096 18.1512 9 17.9261 9 17.4852L9 2.51476C9 2.07393 8.47096 1.84881 8.15331 2.15447L0.374422 9.63971Z'
              fill='#0076FF'
            />
          </svg>

          <div className='x-between'>
            <div className='my-auto text-xs font-semibold'>{title}</div>
            <button className='sticky top-0 right-0 my-auto'>
              <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3 9L9 3M3 3L9 9'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>

          <div className='mt-2 text-xs font-light leading-[18px]'>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial='hide'
            animate='show'
            exit='hide'
            variants={{
              show: {
                opacity: 1,
                x: 0,
              },
              hide: {
                opacity: 0,
                x: 10,
              },
            }}
            transition={{
              duration: 0.4,
            }}
            className={clsx('hidden-scrollbar absolute left-8', className)}
            style={{
              top: 'calc(-25%)',
            }}
          >
            <svg
              width='12'
              height='20'
              viewBox='0 0 12 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute -left-[8px]'
              style={{
                top: 'calc(50% - 10px)',
              }}
            >
              <path
                d='M0.374422 9.63971C0.170005 9.83641 0.170005 10.1636 0.374421 10.3603L8.15331 17.8455C8.47096 18.1512 9 17.9261 9 17.4852L9 2.51476C9 2.07393 8.47096 1.84881 8.15331 2.15447L0.374422 9.63971Z'
                fill='#0076FF'
              />
            </svg>

            <div className='relative my-auto max-h-[104px] min-w-[320px] max-w-[320px] overflow-y-auto rounded-lg bg-primary-main p-3 text-xs text-white'></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
