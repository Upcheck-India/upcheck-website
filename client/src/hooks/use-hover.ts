import { useState, useCallback, useRef } from 'react';

export function useHover() {
  const [isOpen, setIsOpen] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();

  const onMouseEnter = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setIsOpen(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    timeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 300); // Small delay before closing to make it feel smoother
  }, []);

  return {
    isOpen,
    onMouseEnter,
    onMouseLeave
  };
}