import { useEffect, useState } from 'react';

const useDebouncedValue = ({
  value,
  delay = 500,
}: {
  value: unknown;
  delay?: number;
}) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebouncedValue;
