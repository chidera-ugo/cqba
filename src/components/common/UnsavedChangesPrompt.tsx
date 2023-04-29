import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Confirmation } from 'components/modals/Confirmation';

interface Props {
  hasUnsavedChanges: boolean;
}

const UnsavedChangesPrompt = ({ hasUnsavedChanges }: Props) => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const destinationRef = useRef('');
  const canProceed = useRef(false);

  const promptMessage =
    'You have unsaved changes, are you sure you want to leave this page? Your changes will be lost';

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !canProceed.current) {
        e.preventDefault();
        e.returnValue = promptMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    const handleRouteChangeStart = (destination: string) => {
      if (hasUnsavedChanges && !canProceed.current) {
        setShowConfirmation(true);
        destinationRef.current = destination;
        router.events.emit('routeChangeError');
        throw 'routeChanges aborted.';
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [hasUnsavedChanges, router.events]);

  return (
    <Confirmation
      show={showConfirmation}
      buttonTexts={['Cancel', 'Continue']}
      title='Discard Changes'
      subTitle={promptMessage}
      positive={() => {
        canProceed.current = true;
        setShowConfirmation(false);
        router.push(destinationRef.current);
      }}
      negative={() => {
        setShowConfirmation(false);
      }}
    />
  );
};

export default UnsavedChangesPrompt;
