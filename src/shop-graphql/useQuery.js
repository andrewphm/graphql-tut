import { useGraphQL } from './useGraphQL';
import { useEffect, useState } from 'react';

export const useQuery = (query, variables) => {
  const client = useGraphQL();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data, error } = await client.query(query, variables);

      setData(data);
      setError(error);
      setLoading(false);
    };

    fetchData();
  }, [client, query, variables]);

  return {
    loading,
    error,
    data,
  };
};
