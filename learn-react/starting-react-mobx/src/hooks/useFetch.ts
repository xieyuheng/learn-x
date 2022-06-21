import { useState, useEffect } from 'react';

export default function useFetch(url: string): {
  result: any;
  isLoading: boolean;
  errorMessage: string | null;
} {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResult() {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await fetch(url);
        setResult(await response.json());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(
          error instanceof Error ? error.message : JSON.stringify(error)
        );
      }
    }

    fetchResult();
  }, [url]);

  return { result, isLoading, errorMessage };
}
