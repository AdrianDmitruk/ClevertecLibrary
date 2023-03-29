import { useEffect, useState } from 'react';

type IUseIsBurger = {
  isBurger: boolean;
};

const useIsBurger = (breakpoint = 770): IUseIsBurger => {
  const [isBurger, setIsBurger] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsBurger(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return { isBurger };
};

export default useIsBurger;
