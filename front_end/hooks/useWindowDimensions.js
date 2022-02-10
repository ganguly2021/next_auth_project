import { useState, useEffect } from "react";

const useWindowDimesion = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateDimension = () => {
    setWidth(Number(window.innerWidth));
    setHeight(Number(window.innerHeight));
  };

  useEffect(() => {
    // update height, width state
    setWidth(Number(window.innerWidth));
    setHeight(Number(window.innerHeight));

    // add event listenser on window resize
    window.addEventListener("resize", updateDimension);

    // cleanup
    return () => {
      // clear states
      setWidth(0);
      setHeight(0);

      // clear event listener on window resize
      window.removeEventListener("resize", updateDimension);
    };
  }, []);

  return { width, height };
};

export default useWindowDimesion;
