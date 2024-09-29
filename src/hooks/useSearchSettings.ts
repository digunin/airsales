import { useCallback, useEffect, useState } from 'react';

export const useSearchSettings = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    if (window.innerWidth < 768) {
      setHide(true);
    } else {
      setHide(false);
    }
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  const resizeHandler = debounce(() => {
    if (window.innerWidth >= 768) {
      setHide(false);
    }
  }, 300);

  const toggleSettingsVisible = useCallback(() => {
    setHide(prev => !prev);
  }, []);

  return { hide, toggleSettingsVisible };
};

function debounce<T extends unknown[]>(callback: (...args: T) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: T) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
}
