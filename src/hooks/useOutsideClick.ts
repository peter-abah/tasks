import { useCallback, useEffect } from "react";

// has a bug event listener registered more than once
const useOutsideClick = (
  node: HTMLElement | null,
  callback: (e: MouseEvent) => void
) => {
  const listener = useCallback(
    (e: MouseEvent) => {
      console.log(1);
      // checks if click event occurs outside node
      if (node && e.target instanceof HTMLElement && !node.contains(e.target)) {
        callback(e);
      }
    },
    [node, callback]
  );

  useEffect(() => {
    document.addEventListener("click", listener, true);
    return () => document.removeEventListener("click", listener);
  }, [listener]);
};

export default useOutsideClick;
