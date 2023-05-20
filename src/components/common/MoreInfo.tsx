import { PropsWithChildren, useState } from 'react';
import clsx from 'clsx';
import { Info } from 'components/svgs/others/Info';
import { useAppContext } from 'context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  smaller?: boolean;
  className?: string;
  type?: 'error' | 'normal';
}

export const MoreInfo = ({
  type = 'normal',
  className,
  children,
}: PropsWithChildren<Props>) => {
  const { screenSize } = useAppContext().state;
  const [show, setShow] = useState(false);

  const styling = screenSize?.['mobile']
    ? { left: 'calc(50% + 3px)', transform: 'translateX(-50%)' }
    : {
        top: 'calc(50% - 3px)',
        transform: 'translateY(-50%)',
      };

  return (
    <div
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      className={clsx(className, 'relative')}
    >
      <span className='relative my-auto ml-2 flex cursor-pointer align-middle'>
        <div
          className={clsx(
            type === 'error' ? 'text-red-500' : 'text-neutral-500'
          )}
        >
          <Info />
        </div>
      </span>

      <AnimatePresence>
        {show && (
          <motion.div
            initial='hide'
            animate='show'
            exit='hide'
            variants={{
              show: {
                opacity: 1,
                transition: {
                  duration: 0.1,
                },
              },
              hide: {
                opacity: 0,
                transition: {
                  duration: 0,
                },
              },
            }}
            className={clsx(
              'absolute w-max max-w-[280px] rounded-lg bg-white p-2.5 text-primary-main 640:max-w-[320px]',
              screenSize?.['mobile'] ? 'mt-2' : 'top-0 left-[100%] ml-2'
            )}
            style={{
              filter:
                'drop-shadow(0px 5px 15px rgba(0, 0, 0, 0.12)) drop-shadow(0px 15px 35px rgba(103, 110, 118, 0.08))',
              ...styling,
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
