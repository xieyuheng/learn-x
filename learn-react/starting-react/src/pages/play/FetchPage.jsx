import { useState, useEffect } from 'react';

export default function FetchPage() {
  const [joke, setJoke] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setErrorMessage();
      try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any');
        const result = await response.json();
        setJoke(result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    }

    fetchData().catch(console.error);
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      {isLoading && <div>Loading...</div>}
      {errorMessage && <div>{errorMessage}</div>}
      {joke && (
        <pre className="w-full overflow-x-auto">
          {JSON.stringify(joke, null, 2)}
        </pre>
      )}
    </div>
  );
}
