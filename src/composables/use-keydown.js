import { onBeforeUnmount } from "vue";

const useKeydown = keyCombo => {
  let onKeydown = e => {
    let kc = keyCombo.find(kc => kc.key === e.key);
    if (kc) {
      kc.fn();
    }
  };

  const start = () => {
    window.addEventListener("keydown", onKeydown);
  }

  const stop = () => {
    window.removeEventListener("keydown", onKeydown);
  }

  start();
  onBeforeUnmount(() => {
    stop();
  });

  return { start, stop };
};

export default useKeydown;
