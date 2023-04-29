import { useField, useFormikContext } from 'formik';
import clsx from 'clsx';
import { useDropFile } from 'hooks/forms/useDropFile';
import { useFileSelector } from 'hooks/forms/useFileSelector';
import { FileField } from 'types/Common';
import { FileUpload } from 'components/svgs/forms/FileUpload';

type Props = JSX.IntrinsicElements['input'] &
  FileField & {
    label: string;
    fileType?: 'image' | 'all';
  };

export const FileInput = ({
  label,
  className,
  maximumFileSizeInMB = 10,
  setFile,
  file,
  fileType = 'image',
  ...props
}: Props) => {
  const { fileSelector, errorCb } = useFileSelector();

  const extensions =
    fileType === 'image'
      ? ['jpg', 'png', 'jpeg']
      : ['jpg', 'png', 'jpeg', 'pdf'];

  const [_, meta] = useField(props.name as string);
  const { submitCount } = useFormikContext();
  const id = props.id ?? props.name!;

  useDropFile({
    maximumFileSizeInMB,
    setFile,
    file,
    extensions,
    id,
  });

  const grabFile = () => {
    fileSelector({
      id,
      maximumFileSizeInMB: 10,
      successCb: (val) => setFile(val),
      errorCb,
      extensions,
    });
  };

  const imageAcceptList = 'image/png, image/jpeg';

  return (
    <div className={clsx(className, 'mt-5 w-full')}>
      <div className='flex'>
        <label htmlFor={id} className='text-left'>
          {label}
        </label>
      </div>

      <label htmlFor={id} id={`drop-${id}`} className='group'>
        <div
          className={clsx(
            'input y-center min-h-[100px] px-8 py-5',
            'group-focus:ring-4 group-focus:ring-neutral-200',
            file?.file && 'bg-white',
            !props.disabled
              ? 'hover:border-primary-500 cursor-pointer'
              : 'cursor-not-allowed',
            meta.touched && meta.error ? 'border-error-main' : ''
          )}
        >
          <div className='x-center my-auto text-left'>
            <span
              className={clsx(
                'my-auto mr-4 inline-block text-neutral-500',
                !!file?.file ? 'text-green-500' : ''
              )}
            >
              <FileUpload />
            </span>
            <span className='font-normal text-neutral-400'>
              {file?.file && (
                <span className='mx-auto mb-3 block'>
                  <span className='rounded-lg border border-green-500 py-1 px-2 text-center text-green-600'>
                    {file?.file.name}
                  </span>
                </span>
              )}

              <>
                {`Drag and drop document here or Browse Supported file types: `}
                <span className='uppercase'>
                  {extensions.filter((ext) => ext !== 'jpg').join(', ')}
                </span>
                {`. Max file size: ${maximumFileSizeInMB}MB`}
              </>
            </span>
          </div>
        </div>

        <input
          id={id}
          type='file'
          onChange={() => {
            grabFile();
          }}
          style={{
            display: 'none',
          }}
          disabled={props.disabled}
          className='hidden'
          accept={
            fileType === 'all'
              ? `${imageAcceptList}, application/pdf`
              : imageAcceptList
          }
        />
      </label>

      {!!submitCount && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
