import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export const AnimateLayout = ({
  changeTracker,
  className,
  children,
}: PropsWithChildren<{
  changeTracker: string | number;
  className?: string;
}>) => {
  return (
    <AnimatePresence initial={false} mode='popLayout'>
      <motion.div
        initial='enter'
        animate='center'
        exit='exit'
        variants={{
          enter: {
            x: '110%',
          },
          center: {
            x: 0,
          },
          exit: {
            x: '-110%',
          },
        }}
        transition={{
          y: { type: 'spring', stiffness: 300, damping: 30 },
          duration: 0.3,
        }}
        key={changeTracker}
        className={clsx(className, 'flex flex-col')}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
