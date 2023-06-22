import { useEffect } from 'react';

export const useDetectKeyPress = (key: string, actionOnDetect: () => void) => {
  useEffect(() => {
    const handleKeyPress = (e: globalThis.KeyboardEvent) => {
      if (e.key === key) actionOnDetect();
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
};
