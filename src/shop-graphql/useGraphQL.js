import { useContext } from 'react';
import { GraphQLContext } from './context';

export const useGraphQL = () => {
  const context = useContext(GraphQLContext);

  if (context == null) {
    throw new Error('useGraphQL must be used within a GraphQLProvider');
  }

  return context;
};
