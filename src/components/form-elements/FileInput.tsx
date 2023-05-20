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
  setFieldValue,
  getFile,
  fileType = 'image',
  extensions: _extensions,
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
    for (const i of extensions) arr.push(`.${i}`);
    return arr.join(', ');
  }

  return (
    <div className={clsx(className, 'mt-5 w-full')}>
      <div className='mb-1.5 flex'>
        <label
          htmlFor={id}
          className='text-left text-sm font-medium text-neutral-400'
        >
          {label}
        </label>
      </div>

      <label htmlFor={id} id={`drop-${id}`} className='group'>
        <div
          className={clsx(
            'y-center input hover:bg-primary-50 min-h-[100px] rounded-xl border px-4 py-3 hover:border-dashed hover:border-primary-main 640:px-8 640:py-5',
            'group-focus:ring-4 group-focus:ring-neutral-200',
            !props.disabled
              ? 'hover:border-primary-500 cursor-pointer'
              : 'cursor-not-allowed',
            !!file?.file ? 'bg-white' : 'border-white',
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
    </div>
  );
};
