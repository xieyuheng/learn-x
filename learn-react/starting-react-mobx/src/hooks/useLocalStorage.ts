import { useState, useEffect } from 'react';

export default function useLocalStorage<A>(
  key: string,
  initValue: A,
  options: {
    json: (value: A) => any;
    create: (json: any) => A;
  } = {
    json: value => value,
    create: json => json,
  }
) {
  const [value, setValue] = useState<any>(() => {
    const item = localStorage.getItem(key);
    return item ? options.create(JSON.parse(item)) : initValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(options.json(value)));
  }, [key, value]);

  return [value, setValue];
}
