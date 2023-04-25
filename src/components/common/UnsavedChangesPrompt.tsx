import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Props {
  hasUnsavedChanges: boolean;
}

const UnsavedChangesPrompt = ({ hasUnsavedChanges }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (hasUnsavedChanges) {
        const confirmNavigation = confirm(
          'You have unsaved changes, are you sure you want to leave this page?'
        );
        if (!confirmNavigation) {
          router.events.emit('routeChangeError');
          throw 'routeChange aborted.';
        }
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [hasUnsavedChanges, router.events]);

  return null;
};

export default UnsavedChangesPrompt;
