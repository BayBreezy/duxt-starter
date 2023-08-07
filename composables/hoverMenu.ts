export const useHoverMenu = (delay = 350, openDelay = 200) => {
  const show = ref(false);
  const closeTimer = ref(null) as Ref<ReturnType<typeof setTimeout> | null>;
  const openTimer = ref(null) as Ref<ReturnType<typeof setTimeout> | null>;

  const open = () => {
    if (closeTimer.value) {
      clearTimeout(closeTimer.value);
      closeTimer.value = null;
    }
    openTimer.value = setTimeout(() => {
      show.value = true;
      openTimer.value = null;
    }, openDelay);
  };

  const close = () => {
    if (openTimer.value) {
      clearTimeout(openTimer.value);
      openTimer.value = null;
    }
    closeTimer.value = setTimeout(() => {
      show.value = false;
      closeTimer.value = null;
    }, delay);
  };

  return { show, closeTimer, openTimer, open, close };
};
