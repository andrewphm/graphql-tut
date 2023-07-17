import { useGraphQL } from './useGraphQL';
import { useEffect, useState } from 'react';

export const useQuery = (query, variables) => {
  const client = useGraphQL();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const { data } = await client.query(query, variables);
        setData(data);
      } catch (error) {
        setData(null);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [client, query, variables]);

  return {
    loading,
    error,
    data,
  };
};
