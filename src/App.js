import './App.css';
import { useEffect, useState } from 'react';
import CollectionsList from './components/CollectionList';
import Product from './components/Product';
import CollectionProducts from './components/CollectionProducts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GraphQLContext } from './shop-graphql/context';
import { GraphQLClient } from './shop-graphql/client';

// Notes:
// useQuery() to load initial state
// useGraphQL to expose the client
// GraphQLContext to provide the client

const client = new GraphQLClient('https://mock.shop/api');

function App() {
  return (
    <GraphQLContext.Provider value={client}>
      <Router>
        <Routes>
          <Route path="/" element={<CollectionsList />} />
          <Route path="/collections/:collection/:id" element={<CollectionProducts />} />
          <Route path="/products/:product" element={<Product />} />
        </Routes>
      </Router>
    </GraphQLContext.Provider>
  );
}

export default App;
