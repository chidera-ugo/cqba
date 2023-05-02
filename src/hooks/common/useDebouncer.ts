import { useEffect, useRef } from 'react';

interface Args {
  performDebouncedAction: (value?: any) => void;
  onChange?: () => void;
  value?: any;
  dependencies: any[];
  debounce?: number;
}

export const useDebouncer = ({
  performDebouncedAction,
  onChange,
  dependencies,
  debounce = 600,
  value,
}: Args) => {
  const timeout = useRef<any>();

  useEffect(() => {
    clearTimeout(timeout.current);
    onChange && onChange();

    timeout.current = setTimeout(() => {
      performDebouncedAction(value);
    }, debounce);

    return () => clearTimeout(timeout.current);
  }, dependencies);
};
