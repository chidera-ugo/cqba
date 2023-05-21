import clsx from 'clsx';
import { MoreInfo } from 'components/common/MoreInfo';
import { formatAmount } from 'utils/helpers/formatters/formatAmount';

interface Props {
  moreInfo?: string;
  title?: string;
  isAmount?: boolean;
  smallText?: boolean;
  value: string | number;
  className?: string;
  titleClassname?: string;
}

export const DisplayValue = ({
  value,
  smallText,
  title,
  isAmount,
  moreInfo,
  className,
  titleClassname,
}: Props) => {
  return (
    <div className={clsx('my-auto', className)}>
      {title && (
        <div className='flex font-medium text-neutral-400'>
          <div>{title}</div>
          {moreInfo && <MoreInfo>{moreInfo}</MoreInfo>}
        </div>
      )}

      <div
        className={clsx(
          clsx(
            'font-semibold text-neutral-980',
            titleClassname
              ? titleClassname
              : smallText
              ? 'text-lg'
              : 'mt-2 text-3xl'
          )
        )}
      >
        {isAmount && <span className='mr-1.5'>NGN</span>}
        {typeof value === 'string'
          ? value
          : formatAmount({
              value,
              decimalPlaces: isAmount ? 2 : 0,
              kFormatter: isAmount ? value > 999999 : false,
            })}
      </div>
    </div>
  );
};

export const DisplayValueSkeleton = ({
  isLoading,
}: {
  isLoading?: boolean;
}) => {
  return (
    <>
      <div
        className={clsx(
          'h-5 w-[50%] max-w-[200px]',
          isLoading ? 'skeleton' : 'skeleton-error'
        )}
      ></div>
      <div
        className={clsx(
          'mt-7 h-8 w-[70%] max-w-[360px]',
          isLoading ? 'skeleton' : 'skeleton-error'
        )}
      ></div>
    </>
  );
};
