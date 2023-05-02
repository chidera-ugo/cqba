export const useShareDialog = () => {
  const openShareDialog = async (data: any, errorCb: () => void) => {
    if (!navigator.canShare || !navigator.canShare(data)) {
      return errorCb();
    }

    try {
      await navigator.share(data);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    openShareDialog,
  };
};
