export const GET_COLLECTIONS = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        cursor
        node {
          id
          handle
          title
          description
          image {
            id
            url
          }
        }
      }
    }
  }
`;

export const GET_COLLECTION_PRODUCTS = `
  query GetCollection($id: ID!, $first: Int!, $firstVariants: Int!) {
    collection(id: $id) {
      id
      handle
      title
      description
      image {
        id
        url
      }
      products(first: $first) {
        edges {
          node {
            id
            title
            featuredImage {
              id
              url
            }
            variants(first: $firstVariants) {
              edges {
                node {
                  id
                  title
                  image {
                    url
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
}
`;

export const CREATE_CART = `
  mutation CartCreate($quantity: Int!, $merchandiseId: ID!) {
    cartCreate(
      input: {
        lines: [
          {
            quantity: $quantity
            merchandiseId: $merchandiseId
          }
        ]
      }
    ) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image {
                    id
                    url
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
