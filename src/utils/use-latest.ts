import { useEffect, useRef } from 'react';

export const useClickOutside = (handler: (value?: React.SetStateAction<boolean>) => void) => {
  const domNode = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (!domNode?.current?.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return domNode;
};
