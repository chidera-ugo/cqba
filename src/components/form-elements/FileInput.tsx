import { useField, useFormikContext } from 'formik';
import clsx from 'clsx';
import { useDropFile } from 'hooks/forms/useDropFile';
import { useFileSelector } from 'hooks/forms/useFileSelector';
import { FileField } from 'types/Common';
import { FileUpload } from 'components/svgs/forms/FileUpload';
import { ViewUploadedDocument } from 'components/modules/common/ViewUploadedDocument';

type Props = JSX.IntrinsicElements['input'] &
  FileField & {
    label: string;
    fileType?: 'image' | 'all';
    onClickViewExistingFile?: (src: any) => void;
  };

export const FileInput = ({
  label,
  className,
  maximumFileSizeInMB = 10,
  setFieldValue,
  getFile,
  fileType = 'image',
  extensions: _extensions,
  onClickViewExistingFile,
  ...props
}: Props) => {
  const { fileSelector, errorCb } = useFileSelector();

  const imageExtensions = ['jpg', 'png', 'jpeg'];

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
  });

  function constructAcceptList() {
    if (!extensions?.length) return '';
    const arr = [];
    for (const item of extensions) arr.push(`.${item}`);
    return arr.join(', ');
  }

  return (
    <div className={clsx(className, 'mt-5 w-full')}>
      <div className='mb-1.5 flex'>
        <div className='text-left text-sm font-medium text-neutral-400'>
          {label}
        </div>
      </div>

      <label htmlFor={id} id={`drop-${id}`} className='group'>
        <div
          className={clsx(
            'y-center input hover:bg-primary-50 min-h-[100px] rounded-xl border px-4 py-3 hover:border-dashed hover:border-primary-main 640:px-8 640:py-5',
            'group-focus:ring-4 group-focus:ring-neutral-200',
            !props.disabled
              ? 'hover:border-primary-500 cursor-pointer'
              : 'cursor-not-allowed',
            !!file?.file || !!file?.webUrl
              ? 'border-solid border-blue-400 bg-white'
              : 'border-white',
            meta.touched && meta.error ? 'border-error-main' : ''
          )}
        >
          <div className='my-auto flex text-left'>
            <div className={clsx('mr-4 mt-1.5 inline-block text-neutral-400')}>
              <FileUpload />
            </div>
            <div className='font-normal text-neutral-400'>
              {file?.file && (
                <div className='mx-auto mt-1 flex'>
                  <span className='my-auto rounded-lg border border-primary-main py-1 px-2 text-left text-xs font-medium text-primary-main line-clamp-1'>
                    {file?.file.name}
                  </span>
                </div>
              )}

              <div className={clsx(file?.file && 'mt-2', 'text-sm')}>
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
              successCb: (val) => setFieldValue(id, val),
              errorCb,
              extensions,
            })
          }
          style={{
            display: 'none',
          }}
          disabled={props.disabled}
          className='hidden'
          accept={constructAcceptList()}
        />
      </label>

      {!!submitCount && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}

      {!!file?.webUrl && onClickViewExistingFile ? (
        <div className='mt-2 flex justify-end'>
          <ViewUploadedDocument
            url={file.webUrl}
            onClick={(src) => onClickViewExistingFile(src)}
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
          </ViewUploadedDocument>
        </div>
      ) : null}
    </div>
  );
};
