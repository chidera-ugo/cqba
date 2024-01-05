import clsx from 'clsx';
import { NoData } from 'components/core/Table/NoData';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { StaticImageData } from 'next/image';
import { PaginatedResponse } from 'types/Table';

type Props = {
  title: string;
  data?: PaginatedResponse<any>;
  canNotShowData?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  minimal?: boolean;
  refetch?: () => void;
  noDataConfig?: NoDataConfig;
};

export type NoDataConfig = {
  image?: StaticImageData;
  title?: string;
  description?: string;
};

export const TableDataStates = ({
  canNotShowData,
  noDataConfig,
  minimal,
  isLoading,
  data: res,
  isError,
  title,
  refetch,
}: Props) => {
  const IsEmpty = () => {
    return (
      <NoData
        processing={!!isLoading}
        type='budget'
        imageSrc={noDataConfig?.image}
        title={noDataConfig?.title}
        toastClassname={'bottom-24'}
        subTitle={noDataConfig?.description}
      />
    );
  };

  return (
    <>
      {canNotShowData ? (
        <IsEmpty />
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
        <IsEmpty />
      ) : null}
    </>
  );
};
