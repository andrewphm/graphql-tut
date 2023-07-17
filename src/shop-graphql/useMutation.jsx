import { useGraphQL } from './useGraphQL';
import { useState } from 'react';

export const useMutation = (mutation, variables) => {
  const client = useGraphQL();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const executeMutation = async (variables) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const { data } = await client.query(mutation, variables);

      setData(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [
    executeMutation,
    {
      loading,
      error,
      data,
    },
  ];
};
