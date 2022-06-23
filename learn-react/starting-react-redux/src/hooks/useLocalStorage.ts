import { useState, useEffect } from 'react';

export default function useLocalStorage(key: string, initValue: any) {
  const [value, setValue] = useState<any>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
