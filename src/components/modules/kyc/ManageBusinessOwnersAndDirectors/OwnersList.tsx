import clsx from 'clsx';
import { DeleteIcon, EditIcon } from 'components/svgs/EditAndDelete';
import { IOwner } from 'hooks/api/kyc/useUpdateOwnerInformation';
import { Dispatch, SetStateAction } from 'react';
import { generatePlaceholderArray } from 'utils/generators/generatePlaceholderArray';

interface Props {
  isLoading: boolean;
  isError: boolean;
  data?: IOwner[];
  setCurrentOwner: Dispatch<SetStateAction<IOwner | null>>;
  handleShowModal: () => void;
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
  setOwnerToDelete,
}: Props) => {
  if (isLoading) return <IsLoadingIsError isLoading />;

  if (isError) return <IsLoadingIsError />;

  return (
    <>
      {data?.map((owner) => {
        const { firstName, lastName, percentOwned, _id } = owner;

        return (
          <div
            key={_id}
            className='card mt-4 gap-2.5 rounded-2xl border-neutral-200 p-6'
          >
            <div className='text-left text-base font-medium text-black line-clamp-1 group-hover:text-primary-main'>
              {firstName} {lastName}
            </div>

            <p className={'font-light text-neutral-500'}>Director, Owner</p>

            <div className='x-between mt-4'>
              <div
                className={
                  'y-center my-auto h-10 rounded-full border border-neutral-200 px-3 text-sm font-medium'
                }
              >
                {percentOwned}% Ownership
              </div>

              <div className='flex gap-2'>
                <button
                  className={''}
                  onClick={() => {
                    setCurrentOwner(owner);
                    handleShowModal();
                  }}
                >
                  <EditIcon />
                </button>

                <button
                  onClick={() => {
                    setOwnerToDelete({
                      name: `${firstName} ${lastName}`,
                      id: _id,
                    });
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
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
