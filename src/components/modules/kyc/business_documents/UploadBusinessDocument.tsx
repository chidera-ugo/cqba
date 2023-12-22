import { FileInput, Props } from 'components/form-elements/FileInput';
import { useUploadFileWithProgress } from 'hooks/api/useUploadFileWithProgress';

export const UploadBusinessDocument = ({
  setFieldValue,
  name,
  openImagePreviewModal,
  getFile,
  label,
}: Props) => {
  const { isLoading, mutate, uploadProgress, setProgress } =
    useUploadFileWithProgress(
      `/update-business-documentation`,
      'organizations'
    );

  return (
    <FileInput
      label={label}
      name={name}
      fileType='all'
      maximumFileSizeInMB={2}
      handleUpload={(file) => {
        const body = new FormData();
        body.append('file', file?.file);

        setProgress(0);
        mutate(file);
      }}
      uploading={isLoading}
      {...{
        uploadProgress,
        setFieldValue,
        openImagePreviewModal,
        getFile,
      }}
    />
  );
};
