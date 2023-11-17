import clsx from 'clsx';
import { Trash } from 'components/svgs/others/Trash';
import { IOwner } from 'hooks/api/kyc/useUpdateOwnerInformation';
import { Dispatch, SetStateAction } from 'react';
import { generatePlaceholderArray } from 'utils/generators/generatePlaceholderArray';

interface Props {
  isLoading: boolean;
  isError: boolean;
  data?: IOwner[];
  setCurrentOwner: Dispatch<SetStateAction<IOwner | null>>;
  handleShowModal: () => void;
  isUnderReview?: boolean;
  setOwnerToDelete: Dispatch<
    SetStateAction<{ name: string; id: string } | null>
  >;
}

export const OwnersList = ({
  data,
  isError,
  isLoading,
  setCurrentOwner,
  handleShowModal,
  isUnderReview,
  setOwnerToDelete,
}: Props) => {
  if (isLoading) return <IsLoadingIsError isLoading />;

  if (isError) return <IsLoadingIsError />;

  return (
    <>
      {data?.map((owner) => {
        const { firstName, lastName, id } = owner;

        return (
          <div key={id}>
            <div className='mt-4 flex h-14 gap-2.5'>
              <button
                onClick={() => {
                  setCurrentOwner(owner);
                  handleShowModal();
                }}
                className='x-between group my-auto h-full w-full rounded-xl bg-neutral-100 px-4'
              >
                <span className='my-auto text-left text-sm font-medium text-black line-clamp-1 group-hover:text-primary-main'>
                  {firstName} {lastName}
                </span>

                <div className='my-auto text-xs text-primary-main group-hover:underline'>
                  {isUnderReview ? 'View' : 'Edit'}
                </div>
              </button>

              {!isUnderReview && (
                <button
                  onClick={() => {
                    setOwnerToDelete({
                      name: `${firstName} ${lastName}`,
                      id,
                    });
                  }}
                  className='y-center w-14 flex-shrink-0 rounded-lg bg-neutral-100 text-neutral-400 text-primary-main hover:bg-red-100 hover:bg-opacity-50 hover:text-red-500'
                >
                  <div className='mx-auto'>
                    <Trash />
                  </div>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

const IsLoadingIsError = ({ isLoading }: { isLoading?: boolean }) => {
  return (
    <div>
      {generatePlaceholderArray(2).map((i) => {
        return (
          <div key={i} className='mt-4 flex h-14 gap-2.5'>
            <div
              className={clsx(
                'h-full w-full rounded-lg',
                isLoading ? 'skeleton' : 'skeleton-error'
              )}
            ></div>

            <div
              className={clsx(
                'h-full w-14 flex-shrink-0 rounded-lg',
                isLoading ? 'skeleton' : 'skeleton-error'
              )}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
