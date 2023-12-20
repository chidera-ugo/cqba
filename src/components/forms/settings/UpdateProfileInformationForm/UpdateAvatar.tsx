import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { ImageIcon } from 'components/svgs/forms/ImageIcon';
import { imageExtensions } from 'constants/files/image_extensions';
import { useAppContext } from 'context/AppContext';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { useFileSelector } from 'hooks/forms/useFileSelector';
import { SetFieldValue } from 'types/commons';
import { constructAcceptedFileTypeList } from 'utils/constructors/constructAcceptedFileTypeList';

interface Props {
  avatar?: string;
  setFieldValue: SetFieldValue;
}

export const UpdateAvatar = ({ avatar, setFieldValue }: Props) => {
  const { fileSelector, errorCb } = useFileSelector();
  const { user } = useAppContext().state;
  const id = 'avatar';
  const { getColor } = useGetColorByChar();

  const initials = `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`;

  return (
    <div className='mb-3 w-full grid-cols-12 gap-5 425:grid'>
      <div className={'y-between col-span-6 640:col-span-4'}>
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

      <div className='col-span-6 mt-5 425:mt-0 640:col-span-8'>
        <div className='y-center h-[128px] w-[128px] overflow-hidden rounded-full bg-neutral-200'>
          {avatar ? (
            <img
              className={'my-auto h-full w-full object-cover object-center'}
              src={avatar}
              height={128}
              width={128}
              alt={'avatar'}
            />
          ) : (
            <Avatar
              getBackgroundColor={getColor}
              initials={initials}
              size={128}
            />
          )}
        </div>
      </div>
    </div>
  );
};
