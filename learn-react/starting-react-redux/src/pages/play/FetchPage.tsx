import useFetch from '../../hooks/useFetch';

export default function FetchPage() {
  const { result, isLoading, errorMessage } = useFetch(
    'https://v2.jokeapi.dev/joke/Any'
  );

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {errorMessage && <div>{errorMessage}</div>}
      {result?.type === 'single' && <div>{result.joke}</div>}
      {result?.type === 'twopart' && (
        <div className="space-y-2">
          <div>{result.setup}</div>
          <hr />
          <div>{result.delivery}</div>
        </div>
      )}
    </div>
  );
}
