export const useShareDialog = () => {
  const openShareDialog = async (data: any, errorCb: () => void) => {
    let caughtError = false;

    if (!navigator.canShare || !navigator.canShare(data)) {
      return errorCb();
    }

    try {
      await navigator.share(data);
    } catch (e) {
      if (caughtError) return;
      caughtError = true;
      errorCb();
      // $sentry
    }
  };

  return {
    openShareDialog,
  };
};
