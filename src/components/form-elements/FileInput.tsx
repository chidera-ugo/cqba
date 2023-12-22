import { Spinner } from 'components/svgs/dashboard/Spinner';
import { SmallCheck } from 'components/svgs/others/Check';
import { imageExtensions } from 'constants/files/image_extensions';
import { useField, useFormikContext } from 'formik';
import clsx from 'clsx';
import { useDropFile } from 'hooks/forms/useDropFile';
import { useFileSelector } from 'hooks/forms/useFileSelector';
import { FileField, IFile } from 'types/commons';
import { FileUpload } from 'components/svgs/forms/FileUpload';
import { ViewUploadedImage } from 'components/modules/commons/ViewUploadedImage';
import { constructAcceptedFileTypeList } from 'utils/constructors/constructAcceptedFileTypeList';

export type Props = JSX.IntrinsicElements['input'] &
  FileField & {
    label?: string;
    fileType?: 'image' | 'all';
    openImagePreviewModal?: (src: any) => void;
    handleUpload?: (file: IFile) => void;
    uploadProgress?: number;
    uploading?: boolean;
  };

export const FileInput = ({
  label,
  className,
  uploading,
  maximumFileSizeInMB = 10,
  setFieldValue,
  getFile,
  fileType = 'image',
  extensions: _extensions,
  openImagePreviewModal,
  handleUpload,
  uploadProgress = 0,
  ...props
}: Props) => {
  const { fileSelector, errorCb } = useFileSelector();

  const extensions = _extensions
    ? _extensions
    : fileType === 'image'
    ? imageExtensions
    : ['jpg', 'png', 'jpeg', 'pdf'];

  const [_, meta] = useField(props.name as string);
  const { submitCount } = useFormikContext();
  const id = props.id ?? props.name!;
  const file = !getFile ? null : getFile(id);

  useDropFile({
    maximumFileSizeInMB,
    setFieldValue,
    file,
    extensions,
    id,
    onSuccess: handleUpload,
  });

  function isImage() {
    if (!file?.webUrl) return false;

    const url = file.webUrl;

    const chunks = url?.split('.');
    const extension = chunks[chunks?.length - 1]?.toLowerCase();

    return !!(extension && imageExtensions.includes(extension));
  }

  return (
    <div className={clsx(className, 'mt-5 w-full')}>
      <div className='mb-1.5 flex'>
        <div className='text-left text-sm font-medium text-neutral-400'>
          {label}
        </div>
      </div>

      <label htmlFor={id} id={`drop-${id}`} className='group relative'>
        <div
          className={clsx(
            'y-center input min-h-[100px] rounded-xl border px-4 py-3 hover:border-dashed hover:border-primary-main hover:bg-primary-50 640:px-8 640:py-5',
            'group-focus:ring-4 group-focus:ring-neutral-200',
            !props.disabled
              ? 'hover:border-primary-500 cursor-pointer'
              : 'cursor-not-allowed',
            !!file?.file || !!file?.webUrl
              ? clsx(
                  'border-solid bg-white',
                  uploadProgress < 0 ? 'border-red-400' : 'border-blue-400'
                )
              : 'border-white',
            meta.touched && meta.error ? 'border-error-main' : ''
          )}
        >
          <div className='my-auto flex text-left'>
            <div className={clsx('mr-4 mt-1.5 inline-block text-neutral-400')}>
              <FileUpload />
            </div>
            <div className='font-normal text-neutral-400'>
              <div className='mx-auto mt-1 flex'>
                {!!file?.file ? (
                  <span
                    className={clsx(
                      'relative my-auto overflow-hidden rounded-lg border py-1 px-2 text-left text-xs font-medium text-primary-main line-clamp-1',
                      uploadProgress < 0
                        ? 'border-red-500'
                        : 'border-primary-main'
                    )}
                  >
                    {uploadProgress > 0 && (
                      <div
                        className={
                          'absolute left-0 bottom-0 h-full bg-blue-200'
                        }
                        style={{
                          width: `${uploadProgress * 100}%`,
                        }}
                      ></div>
                    )}

                    <span className={'relative z-10 my-auto'}>
                      {uploadProgress < 0 ? (
                        <span className={'text-red-500 line-clamp-1'}>
                          Failed to upload file
                        </span>
                      ) : (uploadProgress > 0 && uploadProgress < 100) ||
                        uploading ? (
                        <span className={'flex gap-1'}>
                          <span className={'my-auto'}>
                            <Spinner className={'h-3 w-3'} />
                          </span>
                          <span className={'my-auto line-clamp-1'}>
                            Uploading {file?.file?.name ?? 'Document'}
                          </span>
                        </span>
                      ) : (
                        <span className={'flex gap-1'}>
                          <span className={'my-auto'}>
                            <SmallCheck />
                          </span>
                          <span className='my-auto line-clamp-1'>
                            Uploaded {file?.file?.name ?? 'Document'}
                          </span>
                        </span>
                      )}
                    </span>
                  </span>
                ) : !!file?.webUrl ? (
                  <span
                    className={clsx(
                      'relative my-auto overflow-hidden rounded-lg border py-1 px-2 text-left text-xs font-medium text-primary-main line-clamp-1',
                      'border-primary-main'
                    )}
                  >
                    <span className={'relative z-10 my-auto'}>
                      <span className={'flex gap-1'}>
                        <span className={'my-auto'}>
                          <SmallCheck />
                        </span>
                        <span className='my-auto line-clamp-1'>
                          Uploaded Document
                        </span>
                      </span>
                    </span>
                  </span>
                ) : null}
              </div>

              <div
                className={clsx(
                  file?.file || file?.webUrl ? 'mt-2' : '',
                  'text-sm'
                )}
              >
                {!file?.file &&
                  `Drag and drop document here or Browse Supported file types: `}

                <span className='uppercase'>
                  {extensions.filter((ext) => ext !== 'jpg').join(', ')}
                </span>
                {`. Max file size: ${maximumFileSizeInMB}MB`}
              </div>
            </div>
          </div>
        </div>

        <input
          id={id}
          type='file'
          onChange={() =>
            fileSelector({
              id,
              existingFile: file,
              maximumFileSizeInMB,
              successCb: (val) => {
                setFieldValue(id, val);
                if (handleUpload) handleUpload(val as IFile);
              },
              errorCb,
              extensions,
            })
          }
          style={{
            display: 'none',
          }}
          disabled={props.disabled}
          className='hidden'
          accept={constructAcceptedFileTypeList(extensions)}
        />
      </label>

      {!!submitCount && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}

      {isImage() && openImagePreviewModal ? (
        <div className='mt-2 flex justify-end'>
          <ViewUploadedImage
            url={file!.webUrl!}
            onClick={(src) => openImagePreviewModal(src)}
          >
            <div className='blue-mpill-h'>
              <span className='my-auto mr-2'>View Uploaded Document</span>
              <span className='my-auto'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className={clsx('h-4 w-4')}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
                  />
                </svg>
              </span>
            </div>
          </ViewUploadedImage>
        </div>
      ) : null}
    </div>
  );
};
