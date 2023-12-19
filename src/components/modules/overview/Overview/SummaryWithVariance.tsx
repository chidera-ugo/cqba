import clsx from 'clsx';
import { MoreInfo } from 'components/commons/MoreInfo';
import { Outbound } from 'components/svgs/navigation/Arrows';
import { formatAmount } from 'utils/formatters/formatAmount';

interface Props {
  currency?: string;
  moreInfo?: string;
  name: string;
  value: number;
  variance?: number;
  className?: string;
}

export const SummaryWithVariance = ({
  variance = 0,
  name,
  moreInfo,
  currency,
  value,
  className,
}: Props) => {
  return (
    <div className='my-auto'>
      <div className={clsx('flex text-xs 640:text-sm', className)}>
        <div>{name}</div>
        {moreInfo && <MoreInfo className={'my-auto'}>{moreInfo}</MoreInfo>}
      </div>

      <div
        className={clsx(
          'mt-1 flex gap-1 text-2xl font-semibold 640:mt-1 640:text-3xl'
        )}
      >
        {currency && (
          <span
            className={
              'block h-full pt-0.5 text-lg font-semibold 640:pt-1 640:text-xl'
            }
          >
            {currency}
          </span>
        )}
        {formatAmount({
          value,
          decimalPlaces: 2,
        })}
      </div>

      <div className={'mt-1'}>
        <div className={clsx('flex gap-1', className)}>
          <span
            className={clsx(
              'my-auto',
              variance <= 0 ? 'text-green-500' : 'rotate-180 text-red-500'
            )}
          >
            <Outbound />
          </span>
          <span className={'my-auto text-xs'}>
            <span className={'font-medium'}>{Math.abs(variance)}% </span> in
            selected period
          </span>
        </div>
      </div>
    </div>
  );
};
