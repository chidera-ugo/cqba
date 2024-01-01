import { Method, Service } from 'hooks/api/useHttp/types';
import { useTMutation } from 'hooks/api/useTMutation';
import { useState } from 'react';

export const useUploadFileWithProgress = (
  url: string,
  service?: Service,
  method?: Method
) => {
  const [progress, setProgress] = useState(0.5);

  const mutation = useTMutation({
    url,
    service,
    method,
    otherHeaders: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (ev) => {
      setProgress(Math.round((ev.loaded * 100) / Number(ev.total)));
    },
    options: {
      onSuccess() {
        setProgress(100);
      },
      onError() {
        setProgress(-1);
      },
    },
  });

  return { ...mutation, uploadProgress: progress, setProgress };
};
