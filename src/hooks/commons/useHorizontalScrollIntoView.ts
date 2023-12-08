export const useHorizontalScrollIntoView = () => {
  function scrollIntoView(id: string) {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        block: 'nearest',
        inline: 'center',
      });
    }
  }

  return {
    scrollIntoView,
  };
};
