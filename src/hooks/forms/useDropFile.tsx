import { useFileSelector } from 'hooks/forms/useFileSelector';
import { useEffect } from 'react';
import { FileField } from 'types/commons';

export const useDropFile = ({
  id,
  setFieldValue,
  extensions,
  maximumFileSizeInMB,
}: FileField & { id: string }) => {
  const { handleFile, errorCb } = useFileSelector();

  useEffect(() => {
    const dropRegion = document.getElementById(`drop-${id}`);

    const preventDefault = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      const files = e.dataTransfer!.files;

      if (files?.length) {
        handleFile({
          id,
          maximumFileSizeInMB: maximumFileSizeInMB ?? 10,
          successCb: (val) => setFieldValue(id, val),
          errorCb,
          files,
          extensions,
        });
      }
    };

    dropRegion?.addEventListener('dragenter', preventDefault);
    dropRegion?.addEventListener('dragleave', preventDefault);
    dropRegion?.addEventListener('dragover', preventDefault);
    dropRegion?.addEventListener('drop', preventDefault);
    dropRegion?.addEventListener('drop', handleDrop, false);

    return () => {
      dropRegion?.removeEventListener('dragenter', preventDefault);
      dropRegion?.removeEventListener('dragleave', preventDefault);
      dropRegion?.removeEventListener('dragover', preventDefault);
      dropRegion?.removeEventListener('drop', preventDefault);
      dropRegion?.removeEventListener('drop', handleDrop);
    };
  }, []);

  return null;
};
