import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Info } from 'components/svgs/others/Info';

interface Props {
  smaller?: boolean;
  className?: string;
  type?: 'error' | 'normal';
}

export const MoreInfo = ({
  children,
  type = 'normal',
  className,
}: PropsWithChildren<Props>) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const timeout = useRef<any>(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  return (
    <span
      className='relative my-auto ml-2 flex cursor-pointer align-middle'
      onMouseOver={() => setShowMoreInfo(true)}
      onMouseOut={() => setShowMoreInfo(false)}
      onClick={() => {
        clearTimeout(timeout.current);
        setShowMoreInfo(true);
        timeout.current = setTimeout(() => {
          setShowMoreInfo(false);
        }, 3000);
      }}
    >
      <div
        className={clsx(type === 'error' ? 'text-red-500' : 'text-neutral-500')}
      >
        <Info />
      </div>

      <AnimatePresence>
        {showMoreInfo && (
          <motion.p
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
              duration: 0.4,
            }}
            className={clsx(
              'y-center absolute bottom-6 left-[-100px] mr-3 ml-1 h-max min-w-[220px] max-w-[320px] rounded-md bg-black p-2 text-xs font-semibold tracking-[-0.01em] text-neutral-200 640:left-[100%] 640:-top-1.5',
              className
            )}
          >
            {children}
          </motion.p>
        )}
      </AnimatePresence>
    </span>
  );
};
