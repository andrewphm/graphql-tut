import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '../shop-graphql/useQuery';
import { GET_COLLECTIONS } from '../queries';

const variables = {
  first: 10,
};

function CollectionList() {
  const { loading, error, data } = useQuery(GET_COLLECTIONS, variables);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (loading) {
    return <p>loading..</p>;
  }
  const collections = data?.collections?.edges || [];

  return (
    <section className="h-full w-full max-w-4xl mx-auto flex justify-center flex-col items-center mt-11">
      <h2 className="text-2xl font-bold">Collections</h2>
      <ul className="flex flex-wrap gap-5 h-full w-full items-center justify-center">
        {collections.map(({ node: collection }) => {
          const id = collection.id.split('/').pop();
          return (
            <Link to={`/collections/${collection.handle}/${id}`} key={collection.id}>
              <div className="py-4 flex flex-col items-center">
                <div className="h-60 w-60 rounded-full">
                  <img className="h-full" src={collection.image.url} alt={collection.title} />
                </div>
                <div className="ml-3">
                  <p className="text-xl text-center font-medium text-gray-900">
                    {collection.title}
                  </p>
                  <p className="text-xl text-gray-500">{collection.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}

export default CollectionList;
