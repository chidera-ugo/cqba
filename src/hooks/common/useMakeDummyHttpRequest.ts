import { useEffect, useState, useRef } from 'react';

type Options = {
  onSuccess?: (res: any) => void;
  onError?: () => void;
};

export const useMakeDummyHttpRequest = <T>({
  method = 'post',
  onSuccess,
  onError,
  res,
  duration = 600,
}: {
  method?: 'get' | 'post';
  res?: T;
  duration?: number;
} & Options) => {
  const [isLoading, setIsLoading] = useState(method === 'get' ? true : false);
  const [hasErrored, setHasErrored] = useState(false);
  const [data, setData] = useState<typeof res | null>(null);
  const mutateTimeout = useRef<any>();
  const queryTimeout = useRef<any>();

  useEffect(() => {
    if (method === 'get') {
      queryTimeout.current = setTimeout(() => {
        setData(res);

        function handleSuccess() {
          onSuccess && onSuccess(res);
        }

        if (onError) {
          if (!hasErrored) {
            setHasErrored(true);
            onError();
          } else {
            handleSuccess();
          }
        } else {
          handleSuccess();
        }

        setIsLoading(false);
      }, duration);
    }

    return () => {
      clearTimeout(queryTimeout.current);
      clearTimeout(mutateTimeout.current);
    };
  }, []);

  function mutate(
    body?: any,
    options?: Options
  ): Promise<{ success: boolean; data: any }> {
    return new Promise((resolve) => {
      setIsLoading(true);
      mutateTimeout.current = setTimeout(() => {
        const res = {
          success: true,
          data: body,
        };
        resolve(res);

        function handleSuccess() {
          if (options?.onSuccess) {
            options.onSuccess(res);
          } else {
            onSuccess && onSuccess(res);
          }
        }

        if (onError) {
          if (!hasErrored) {
            setHasErrored(true);
            onError();
          } else {
            handleSuccess();
          }
        } else {
          handleSuccess();
        }

        setIsLoading(false);
      }, duration);
    });
  }

  return {
    isLoading,
    mutate,
    data,
    isError: false,
    refetch() {
      setData(res);
    },
  };
};
