import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchResult() {
      setIsLoading(true);
      setErrorMessage();
      try {
        const response = await fetch(url);
        setResult(await response.json());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    }

    fetchResult();
  }, [url]);

  return { result, isLoading, errorMessage };
}
