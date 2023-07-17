import React, { useMemo } from 'react';
import { useMatch } from 'react-router-dom';
import { useQuery, useMutation } from '../shop-graphql';
import { GET_COLLECTION_PRODUCTS, CREATE_CART } from '../queries';

import Cart from './Cart';

function CollectionProducts() {
  const match = useMatch('/collections/:handle/:id');

  const variables = useMemo(
    () => ({
      id: `gid://shopify/Collection/${match?.params?.id}`,
      first: 10,
      firstVariants: 3,
    }),
    [match?.params?.id]
  );

  const [createCart, { loading: cartLoading, data: cartData }] = useMutation(CREATE_CART);

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(GET_COLLECTION_PRODUCTS, variables);

  const handleCartCreate = async (id) => {
    await createCart({
      merchandiseId: id,
      quantity: 1,
    });
  };

  const collection = queryData?.collection || {};
  const products = collection?.products?.edges || [];

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error: {queryError.message}</p>;

  return (
    <section className="px-10 h-full w-full max-w-7xl mx-auto flex justify-center flex-col items-center mt-11">
      <h2 className="text-2xl font-bold mb-4">{collection.title}</h2>
      <p>{collection.description}</p>
      <img
        className="w-full h-64 object-cover mt-4"
        src={collection.image?.url}
        alt={collection.title}
      />

      <Cart cartData={cartData} cartLoading={cartLoading} />
      <div className="grid grid-cols-2 gap-4 mt-8 w-full">
        {products.map(({ node: product }) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              className="w-full h-48 object-contain"
              src={product.featuredImage?.url}
              alt={product.title}
            />
            <h3 className="text-lg font-bold mt-2 text-center">{product.title}</h3>
            <div className="mt-4 flex w-full">
              <div className="mx-auto flex gap-x-4 ">
                {product.variants.edges.map(({ node: variant }) => (
                  <div key={variant.id} className="mt-2">
                    <p>{variant.title}</p>
                    <img
                      className="w-16 h-16 object-contain"
                      src={variant.image?.url}
                      alt={variant.title}
                    />
                    <p>
                      {variant.price.amount} {variant.price.currencyCode}
                    </p>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded my-4 "
                      onClick={() => handleCartCreate(variant.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CollectionProducts;
