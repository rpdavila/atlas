import { useState, useEffect } from 'react';

interface Viewport {
  width: number;
}

const useViewport = (): Viewport => {
  const [viewport, setViewport] = useState<Viewport>({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewport;
};

export default useViewport;