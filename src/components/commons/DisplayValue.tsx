import clsx from 'clsx';
import { MoreInfo } from 'components/commons/MoreInfo';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { PropsWithChildren } from 'react';
import { formatAmount } from 'utils/formatters/formatAmount';

interface Props {
  moreInfo?: string;
  title?: string;
  isAmount?: boolean;
  smallText?: boolean;
  value: any;
  percentageChangeConfig?: {
    duration: string;
    value?: number;
  };
  titleClassName?: string;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
  normal?: boolean;
  valueClassname?: string;
}

export const DisplayValue = ({
  value,
  percentageChangeConfig,
  title,
  isAmount,
  moreInfo,
  isError,
  smallText,
  isLoading,
  className,
  titleClassName,
  normal,
  valueClassname,
}: Props) => {
  if (normal)
    return (
      <div className={className}>
        <div className={'text-sm text-neutral-600'}>{title}</div>
        <div
          className={clsx(
            'mt-0.5 text-base font-medium text-neutral-900',
            valueClassname
          )}
        >
          {value}
        </div>
      </div>
    );

  return (
    <div className={clsx('my-auto', className)}>
      <div className='flex font-normal text-neutral-500'>
        {title && (
          <div className={clsx('text-xs 640:text-sm', titleClassName)}>
            {title}
          </div>
        )}
        {moreInfo && (
          <MoreInfo className={'hidden 1180:block'}>{moreInfo}</MoreInfo>
        )}
      </div>

      <div
        className={clsx(
          'font-semibold',
          smallText ? 'text-lg' : 'mt-1.5 text-lg 640:mt-2 640:text-3xl'
        )}
      >
        {isLoading ? (
          <div className='y-center h-9 640:h-10'>
            <Spinner className={'h-7 w-7'} />
          </div>
        ) : isError ? (
          <span className={'text-red-400'}>xxx</span>
        ) : (
          <>
            {isAmount && <span>₦</span>}
            {typeof value === 'string'
              ? value
              : formatAmount({
                  value,
                  decimalPlaces: isAmount ? 2 : 0,
                  kFormatter: isAmount ? value > 99999999 : false,
                })}
          </>
        )}
      </div>

      <div>
        {percentageChangeConfig && (
          <span
            className={clsx(
              Number(percentageChangeConfig.value) > 0
                ? 'text-green-600'
                : 'text-red-500',
              'mt-2 flex text-sm font-medium'
            )}
          >
            <span className='my-auto'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2.5}
                stroke='currentColor'
                className={clsx(
                  'h-4 w-4',
                  Number(percentageChangeConfig.value) < 0 && 'rotate-180'
                )}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75'
                />
              </svg>
            </span>
            <span>{Math.abs(Number(percentageChangeConfig.value))}%</span>
            <span className='my-auto ml-1'>
              {percentageChangeConfig.duration}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export const DisplayValueSkeleton = ({
  isLoading,
  children,
  className,
  noDiff,
}: PropsWithChildren<{
  isLoading?: boolean;
  className?: string;
  noDiff?: boolean;
}>) => {
  return (
    <div className={clsx(className, 'w-full')}>
      <div className='w-full'>
        <div
          className={clsx(
            'h-5 w-[50%] max-w-[200px]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
        <div
          className={clsx(
            'mt-3 h-8 w-[70%] max-w-[360px]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>

        {!noDiff && (
          <div
            className={clsx(
              'mt-4 h-3 w-[30%] max-w-[360px]',
              isLoading ? 'skeleton' : 'skeleton-error'
            )}
          ></div>
        )}
      </div>

      {children}
    </div>
  );
};
