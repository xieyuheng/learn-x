import { useParams } from 'react-router-dom';

export default function EchoPage() {
  const params = useParams();

  return <div>echo: {params.value}</div>;
}
