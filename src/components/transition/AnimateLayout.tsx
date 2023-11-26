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
            x: '100%',
          },
          center: {
            x: 0,
          },
          exit: {
            x: '-100%',
          },
        }}
        transition={{
          y: { type: 'spring', stiffness: 300, damping: 30 },
          duration: 0.3,
        }}
        key={changeTracker}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
