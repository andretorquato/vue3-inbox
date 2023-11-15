import { onBeforeUnmount } from "vue";

const useKeydown = keyCombo => {
  let onKeydown = e => {
    let kc = keyCombo.find(kc => kc.key === e.key);
    if (kc) {
      kc.fn();
    }
  };
  window.addEventListener("keydown", onKeydown);

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeydown);
  });
};

export default useKeydown;
