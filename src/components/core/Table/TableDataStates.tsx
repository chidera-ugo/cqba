import clsx from 'clsx';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { NothingHere } from 'components/illustrations/NothingHere';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';

type Props = {
  title: string;
  data: any;
  canNotShowData?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  minimal?: boolean;
  emptyTableText?: string;
  refetch?: () => void;
  emptyTableIcon?: JSX.Element;
};

export const TableDataStates = ({
  canNotShowData,
  emptyTableText,
  emptyTableIcon,
  minimal,
  isLoading,
  data: res,
  isError,
  title,
  refetch,
}: Props) => {
  return (
    <>
      {canNotShowData ? (
        <IsEmpty {...{ emptyTableText, emptyTableIcon, minimal }} />
      ) : isLoading && !res?.content.length ? (
        <IsLoading
          className={clsx(minimal ? 'h-[50px]' : 'h-[200px] 640:h-[300px]')}
        />
      ) : isError ? (
        <IsError
          className={clsx(minimal ? 'py-10' : 'py-20')}
          noIcon={minimal}
          description={`An error occurred fetching ${title}`}
          actionButton={
            !refetch || minimal
              ? undefined
              : {
                  action: refetch,
                }
          }
        />
      ) : res?.empty ? (
        <IsEmpty {...{ emptyTableText, emptyTableIcon, minimal }} />
      ) : null}
    </>
  );
};

export const IsEmpty = ({
  emptyTableText,
  emptyTableIcon,
  minimal,
}: {
  emptyTableText?: string;
  emptyTableIcon?: JSX.Element;
  minimal?: boolean;
}) => {
  return (
    <div className={clsx('y-center h-full px-5', minimal ? 'py-10' : 'py-20')}>
      {emptyTableText && (
        <SimpleInformation
          title={
            minimal ? undefined : (
              <span className='text-xl'>Nothing to show (yet)</span>
            )
          }
          description={<span className='mt-1 block'>{emptyTableText}</span>}
          icon={
            emptyTableIcon ? (
              emptyTableIcon
            ) : minimal ? undefined : (
              <NothingHere />
            )
          }
        />
      )}
    </div>
  );
};