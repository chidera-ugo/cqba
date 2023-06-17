import { AppToast } from 'components/primary/AppToast';
import { toast } from 'react-toastify';
import { IFile } from 'types/Common';
import { getBase64String } from 'utils/getters/getBase64String';

interface HandleFileProps {
  id: string;
  files?: FileList;
  existingFile?: IFile | null;
  maximumFileSizeInMB: number;
  successCb: (IFile: {
    id: string;
    file: File;
    url: string;
    base64Url?: string;
  }) => void;
  errorCb: (reason: string, maximumFileSizeInMB?: number) => void;
  multipleFilesSelected?: string; // common value in id array of inputs like cover-1 cover-2, hence "cover";
  extensions?: string[];
}

export const useFileSelector = () => {
  const fileSelector = ({
    id,
    maximumFileSizeInMB,
    successCb,
    errorCb,
    multipleFilesSelected,
    extensions,
    existingFile,
  }: HandleFileProps): void => {
    const input = document.getElementById(id) as HTMLInputElement;

    if (multipleFilesSelected) {
      if (input?.files !== null && input?.files?.length > 0) {
        const files = input.files;

        handleFile({
          id,
          maximumFileSizeInMB: 10,
          successCb,
          errorCb,
          files,
          extensions,
          multipleFilesSelected,
        });

        input.value = '';
      }
    } else {
      if (input?.files !== null && input?.files?.length > 0) {
        const files = input.files;

        handleFile({
          id,
          files,
          maximumFileSizeInMB,
          successCb,
          extensions,
          existingFile,
          errorCb,
        });

        input.value = '';
      }
    }
  };

  const handleFile = ({
    id,
    files,
    maximumFileSizeInMB,
    successCb,
    errorCb,
    existingFile,
    multipleFilesSelected,
    extensions,
  }: HandleFileProps) => {
    if (!files) return;

    if (multipleFilesSelected) {
      for (let i = 0; i < files?.length; i++) {
        const file = files[i];

        if (file && file.type.split('/')[0] === 'image') {
          if (file.size <= maximumFileSizeInMB * 1024 * 1024) {
            const parser = new FileReader();

            parser.onload = () => {
              const url = parser.result as string;

              successCb({
                id: `${multipleFilesSelected}-${i + 1}`,
                file,
                url,
                base64Url: getBase64String(url),
              });
            };

            parser.readAsDataURL(file);
          } else {
            errorCb('file_too_large', maximumFileSizeInMB);
          }
        } else {
          errorCb('invalid_extension');
        }
      }

      return;
    }

    const file = files[0];

    if (file && extensions?.includes(`${file.type.split('/')[1]}`)) {
      if (file.size <= maximumFileSizeInMB * 1024 * 1024) {
        const parser = new FileReader();

        parser.onload = () => {
          const url = parser.result as string;

          successCb({
            ...existingFile,
            id,
            file,
            url,
            base64Url: getBase64String(url),
          });
        };

        parser.readAsDataURL(file);
      } else {
        errorCb('file_too_large', maximumFileSizeInMB);
      }
    } else {
      errorCb('invalid_extension');
    }
  };

  const errorCb = (reason: string, maximumFileSizeInMB?: number) => {
    if (reason === 'invalid_extension') {
      toast(<AppToast>Invalid file type</AppToast>, {
        type: 'error',
      });
    } else if (reason === 'file_too_large') {
      toast(
        <AppToast>{`Please select a file that's less than ${maximumFileSizeInMB}MB`}</AppToast>,
        {
          type: 'error',
        }
      );
    } else {
      toast(<AppToast>An error occurred trying to select image</AppToast>, {
        type: 'error',
      });
    }
  };

  return {
    errorCb,
    handleFile,
    fileSelector,
  };
};
