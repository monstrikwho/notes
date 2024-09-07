import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    const rawValue = JSON.stringify(storedValue);
    localStorage.setItem(key, rawValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
