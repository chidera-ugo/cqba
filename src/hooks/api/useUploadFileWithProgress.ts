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
      const { loaded, total } = ev;
      const percent = Math.floor((loaded * 100) / Number(total));

      console.log({ percent });

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
