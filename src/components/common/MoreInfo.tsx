import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Info } from 'components/svgs/others/Info';
import { Tooltip } from 'react-tooltip';
import { useAppContext } from 'context/AppContext';

interface Props {
  smaller?: boolean;
  className?: string;
  type?: 'error' | 'normal';
  id: string;
}

export const MoreInfo = ({
  id,
  type = 'normal',
  className,
  children,
}: PropsWithChildren<Props>) => {
  const { screenSize } = useAppContext().state;

  return (
    <div className={className}>
      <span
        data-tooltip-id={id}
        data-tooltip-place={screenSize?.['mobile'] ? 'top' : 'right'}
        className='relative my-auto ml-2 flex cursor-pointer align-middle'
      >
        <div
          className={clsx(
            type === 'error' ? 'text-red-500' : 'text-neutral-500'
          )}
        >
          <Info />
        </div>
      </span>

      <Tooltip
        id={id}
        className='max-w-[280px] 640:max-w-[320px]'
        style={{
          borderRadius: '8px',
          padding: '10px 10px',
          opacity: 100,
        }}
      >
        {children}
      </Tooltip>
    </div>
  );
};
