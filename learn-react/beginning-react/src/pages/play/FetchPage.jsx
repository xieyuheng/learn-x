import { useState, useEffect } from 'react';

export default function FetchPage() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any');
      const results = await response.json();
      console.log(results);
    }

    fetchData().catch(console.error);
  }, []);

  return <div>fetch</div>;
}
