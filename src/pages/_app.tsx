import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { Slide, ToastContainer } from 'react-toastify';
import clsx from 'clsx';
import { toastClasses } from 'components/primary/AppToast';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppContextProvider } from 'context/AppContext';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-tooltip/dist/react-tooltip.css';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { KycContextProvider } from 'context/KycContext';
import { useHandleError } from 'hooks/api/useHandleError';

export default function App({ Component, pageProps }: AppProps) {
  const { handleError } = useHandleError();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError(e, query) {
            handleError(
              e,
              query.state.data === undefined || query?.meta?.silent === true,
              // Only show error toasts if we already have data in the cache
              // which indicates a failed background update or if a "silent" value is passed
              // directly to the meta object
              undefined
            );
          },
        }),
      })
  );

  return (
    <div className={'min-h-screen bg-white'}>
      <ToastContainer
        position={'top-center'}
        autoClose={3000}
        hideProgressBar={true}
        transition={Slide}
        draggablePercent={60}
        draggableDirection='y'
        icon={false}
        toastClassName={({ type }: any) => {
          const classes = toastClasses[type];

          return clsx(
            classes ? classes : 'bg-white shadow-lg border border-neutral-300',
            'relative toastifier flex p-1 rounded-xl mt-2 z-[2200] w-full justify-between overflow-hidden cursor-pointer'
          );
        }}
        bodyClassName='p-2'
        closeOnClick={false}
        pauseOnHover
        closeButton={false}
      />

      <AppErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <KycContextProvider>
              <Component {...pageProps} />

              <ReactQueryDevtools
                position='bottom-left'
                initialIsOpen={false}
              />
            </KycContextProvider>
          </AppContextProvider>
        </QueryClientProvider>
      </AppErrorBoundary>
    </div>
  );
}
