import { AlertBox } from 'components/common/AlertBox';
import { MoreInfo } from 'components/common/MoreInfo';
import { FailedToLoadPage } from 'pages/404';
import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ComponentFallback({ error, resetErrorBoundary }: any) {
  return (
    <div className='mx-auto my-auto max-w-[880px] bg-white p-5'>
      <AlertBox className='my-auto' message={error.message} type='error' />
      <button
        onClick={() => {
          resetErrorBoundary();
        }}
        className='secondary-button my-auto mt-4 block h-10 w-full'
      >
        Retry
      </button>
    </div>
  );
}

function PageFallback({ error, resetErrorBoundary }: any) {
  return (
    <FailedToLoadPage
      action={() => {
        resetErrorBoundary();
      }}
      message={error.message}
    />
  );
}

function HiddenFallback({ error }: any) {
  return (
    <div className='y-center my-auto h-10 w-10 rounded-lg bg-red-100 text-2xl font-bold text-red-500'>
      <MoreInfo type='error' className='-top-1 right-12'>
        {error.message}
      </MoreInfo>
    </div>
  );
}

interface Props {
  type?: 'page' | 'component' | 'hidden';
  className?: string;
}

export const AppErrorBoundary = ({
  children,
  type = 'component',
  className,
}: PropsWithChildren<Props>) => {
  return (
    <ErrorBoundary
      FallbackComponent={
        type === 'component'
          ? ComponentFallback
          : type === 'hidden'
          ? HiddenFallback
          : PageFallback
      }
    >
      <div className={className}>{children}</div>
    </ErrorBoundary>
  );
};
