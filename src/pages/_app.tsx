import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { Slide, ToastContainer } from 'react-toastify';
import clsx from 'clsx';
import { toastClasses } from 'components/primary/AppToast';
import 'react-toastify/dist/ReactToastify.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppContextProvider } from 'context/AppContext';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      <ToastContainer
        position={'top-center'}
        autoClose={4000}
        hideProgressBar={true}
        transition={Slide}
        icon={false}
        toastClassName={({ type }: any) => {
          const classes = toastClasses[type];

          return clsx(
            classes ? classes : 'bg-white shadow-lg border border-neutral-300',
            'relative toastifier flex p-1 rounded-xl mt-2 z-[1200] w-full justify-between overflow-hidden cursor-pointer'
          );
        }}
        bodyClassName='p-2'
        closeOnClick={false}
        pauseOnHover
        closeButton={false}
      />
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools position='bottom-left' initialIsOpen={false} />
        </QueryClientProvider>
      </AppContextProvider>
    </>
  );
}
