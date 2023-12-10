import clsx from 'clsx';
import { MoreInfo } from 'components/commons/MoreInfo';
import { Outbound } from 'components/svgs/navigation/Arrows';

interface Props {
  currency?: string;
  isAmount?: boolean;
  moreInfo?: string;
  name: string;
  value: string;
  variance?: number;
  className?: string;
}

export const SummaryWithVariance = ({
  variance,
  name,
  moreInfo,
  currency,
  isAmount,
  value,
  className,
}: Props) => {
  return (
    <>
      <div className='my-auto'>
        <div className={clsx('flex text-xs 640:text-sm', className)}>
          <div>{name}</div>
          {moreInfo && <MoreInfo className={'my-auto'}>{moreInfo}</MoreInfo>}
        </div>

        <div
          className={clsx(
            'mt-1 flex gap-0.5 text-2xl font-semibold 640:mt-1 640:text-3xl'
          )}
        >
          {isAmount && (
            <span className={'block h-full pt-1 text-xl font-semibold'}>
              {currency}
            </span>
          )}
          {value}
        </div>

        <div className={'mt-1'}>
          {variance && (
            <div className={clsx('flex gap-1', className)}>
              <span
                className={clsx(
                  'my-auto',
                  variance > 0 ? 'text-green-500' : 'text-red-500'
                )}
              >
                <Outbound />
              </span>
              <span className={'my-auto text-xs'}>
                <span className={'font-medium'}>{Math.abs(variance)}% </span> in
                selected period
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
