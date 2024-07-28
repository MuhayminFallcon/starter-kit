import { useState, useEffect, useCallback } from "react";

type ObjectType = {
  width?: number;
  height?: number;
  isMobile: boolean;
  isDesktop: boolean;
};

function useDeviceInfo() {
  // Change the value as per your config
  const SCREEN_SIZES = {
    MOBILE_WIDTH: 800, // For mobile devices
  };

  const { MOBILE_WIDTH } = SCREEN_SIZES;

  const [object, setObject] = useState<ObjectType>({
    width: undefined,
    height: undefined,
    isMobile: false,
    isDesktop: false,
  });

  const handleResize = useCallback(() => {
    const width = document.documentElement.clientWidth || window.innerWidth;
    const height = document.documentElement.clientHeight || window.innerHeight;
    setObject({
      width: width,
      height: height,
      isMobile: width <= MOBILE_WIDTH,
      isDesktop: width > MOBILE_WIDTH,
    });
  }, [MOBILE_WIDTH]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return object;
}

export default useDeviceInfo;