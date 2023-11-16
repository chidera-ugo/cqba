import clsx from 'clsx';
import { useAppContext } from 'context/AppContext';
import { PropsWithChildren } from 'react';
import { Tooltip } from 'react-tooltip';

interface Props {
  title?: string;
}

export const TooltipContent = ({
  children,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <div className='x-between'>
      <div>
        <div className='mb-1 text-xs font-semibold'>{title}</div>
        <div className={clsx('text-xs font-light leading-[18px]')}>
          {children}
        </div>
      </div>

      <div className='mb-auto ml-1'>
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
      </div>
    </div>
  );
};

export const TooltipWrapper = ({
  show,
  anchorId,
  close,
  ...props
}: PropsWithChildren<
  { anchorId: string; close: () => void; show: boolean } & Props
>) => {
  const { screenSize } = useAppContext().state;

  const disabled = true;

  if (disabled) return <></>;

  return (
    <Tooltip
      isOpen={show}
      place={screenSize?.['miniTablet'] ? 'top' : 'right'}
      anchorSelect={`#${anchorId}`}
      className='z-[1004] h-fit max-w-[240px] cursor-pointer 640:max-w-[320px]'
      style={{
        backgroundColor: '#1A44ED',
        borderRadius: '8px',
        padding: '10px 10px',
        opacity: 100,
      }}
      clickable
    >
      <div onClick={close}>
        <TooltipContent {...props} />
      </div>
    </Tooltip>
  );
};
