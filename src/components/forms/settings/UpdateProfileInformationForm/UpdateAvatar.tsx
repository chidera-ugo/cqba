import clsx from 'clsx';
import { ImageIcon } from 'components/svgs/forms/ImageIcon';
import { UserIcon } from 'components/svgs/UserIcon';
import { imageExtensions } from 'constants/files/image_extensions';
import { useFileSelector } from 'hooks/forms/useFileSelector';
import Image from 'next/image';
import { SetFieldValue } from 'types/commons';
import { constructAcceptedFileTypeList } from 'utils/constructors/constructAcceptedFileTypeList';

interface Props {
  avatar?: string;
  setFieldValue: SetFieldValue;
}

export const UpdateAvatar = ({ avatar, setFieldValue }: Props) => {
  const { fileSelector, errorCb } = useFileSelector();
  const id = 'avatar';

  return (
    <div className='mb-3 grid w-full grid-cols-12'>
      <div className={'y-between col-span-4'}>
        <div>
          <h6>Profile photo</h6>
          <p className={'mt-1 max-w-[200px] text-sm'}>
            This image will be displayed on your profile
          </p>
        </div>

        <div className='mt-3 flex'>
          <label
            htmlFor={id}
            className='group mb-0 flex h-10 cursor-pointer rounded-full border border-primary-main px-4'
          >
            <div className={clsx('flex gap-2')}>
              <span className='my-auto'>
                <ImageIcon />
              </span>

              <span className={'my-auto text-sm font-medium text-primary-main'}>
                Change Photo
              </span>
            </div>

            <input
              id={id}
              type='file'
              onChange={() =>
                fileSelector({
                  id: id,
                  maximumFileSizeInMB: 2,
                  successCb: (val) => setFieldValue(id, val),
                  errorCb,
                  extensions: imageExtensions,
                })
              }
              style={{
                display: 'none',
              }}
              className='hidden'
              accept={constructAcceptedFileTypeList(imageExtensions)}
            />
          </label>
        </div>
      </div>

      <div className='col-span-8'>
        <div className='y-center h-[128px] w-[128px] overflow-hidden rounded-full bg-neutral-200'>
          {avatar ? (
            <Image
              className={'my-auto h-full w-full object-cover object-center'}
              src={avatar}
              height={128}
              width={128}
              alt={'avatar'}
            />
          ) : (
            <div className={'y-center my-auto h-full'}>
              <span className='x-center mx-auto'>
                <UserIcon className={'h-10 w-10 text-neutral-500'} />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
