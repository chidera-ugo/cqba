import clsx from 'clsx';
import { IsEmpty } from 'components/data-states/IsEmpty';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { PaginatedResponse } from 'types/Table';

type Props = {
  title: string;
  data?: PaginatedResponse<any>;
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
        <IsEmpty
          text={emptyTableText}
          icon={emptyTableIcon}
          minimal={minimal}
        />
      ) : isLoading && !res?.docs?.length ? (
        <IsLoading
          className={clsx(
            'text-primary-main',
            minimal ? 'h-[50px]' : 'h-[200px] 640:h-[300px]'
          )}
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
      ) : !res?.docs.length ? (
        <IsEmpty {...{ emptyTableText, emptyTableIcon, minimal }} />
      ) : null}
    </>
  );
};
