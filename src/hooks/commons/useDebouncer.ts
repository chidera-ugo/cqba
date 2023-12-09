import { useEffect, useRef, useState } from 'react';

interface Args<T> {
  performDebouncedAction?: (value?: any) => void;
  onChange?: (value?: T) => void;
  value?: T;
  dependencies?: any[];
  debounce?: number;
}

export const useDebouncer = <T>({
  performDebouncedAction,
  onChange,
  dependencies = [],
  debounce = 600,
  value,
}: Args<T>) => {
  const timeout = useRef<any>();
  const [debouncedValue, setDebouncedValue] = useState(value ?? '');

  useEffect(() => {
    clearTimeout(timeout.current);

    if (onChange) onChange(value);

    setDebouncedValue('');

    timeout.current = setTimeout(() => {
      setDebouncedValue(value ?? '');

      if (!performDebouncedAction) return;

      performDebouncedAction(value);
    }, debounce);

    return () => clearTimeout(timeout.current);
  }, [...dependencies, value]);

  return [debouncedValue] as const;
};
