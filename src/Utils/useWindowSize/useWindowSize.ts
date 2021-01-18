import { useState, useEffect, useCallback } from "react";

// Heavily influenced/based on https://usehooks.com/useWindowSize/
export const useWindowSize = (container?: HTMLElement | null) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const onResize = useCallback(() => {
    setWindowSize({
      width: container ? container.offsetWidth : window.innerWidth,
      height: container ? container.offsetHeight : window.innerHeight,
    });
  }, [container, window]);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    // Initialize values
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, [container?.offsetHeight, onResize]);

  return windowSize;
};
