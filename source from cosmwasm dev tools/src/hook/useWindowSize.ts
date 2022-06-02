import { useState, useEffect } from "react";

const useWindowSize = (width: number = 550) => {
  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState({});

  useEffect(() => {
    handleWindowWidthChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowWidthChange);
    return () => {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  const handleWindowWidthChange = () => {
    const innerWidth = window.innerWidth;
    const outerWidth = window.outerWidth;
    const isSmallerThanMobile = innerWidth < width || outerWidth < width;
    setIsMobile(isSmallerThanMobile);
    setSize({
      inner: innerWidth,
      outer: outerWidth,
    });
  };

  return {
    isMobile,
    width: size,
  };
};

export default useWindowSize;
