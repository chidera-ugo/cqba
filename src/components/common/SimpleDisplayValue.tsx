import clsx from 'clsx';
import { formatAmount } from 'utils/formatters/formatAmount';

interface Props {
  name: string;
  isAmount?: boolean;
  value: string | number;
  className?: string;
  valueClassName?: string;
}

export const SimpleDisplayValue = ({
  name,
  className,
  valueClassName,
  isAmount,
  value,
}: Props) => {
  return (
    <div className={className}>
      <div className='text-sm text-neutral-400'>{name}</div>

      <div
        className={clsx(
          'mt-1 font-semibold text-neutral-1000',
          valueClassName ?? 'text-[28px]'
        )}
      >
        {isAmount
          ? `₦${formatAmount({
              value,
              kFormatter: Number(value) > 9999999,
              decimalPlaces: 2,
            })}`
          : value ?? '---'}
      </div>
    </div>
  );
};
