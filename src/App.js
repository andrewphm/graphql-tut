import './App.css';
import CollectionsList from './components/CollectionList';
import CollectionProducts from './components/CollectionProducts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GraphQLContext } from './shop-graphql/context';
import { GraphQLClient } from './shop-graphql/client';

const client = new GraphQLClient('https://mock.shop/api');

function App() {
  return (
    <GraphQLContext.Provider value={client}>
      <Router>
        <Routes>
          <Route path="/" element={<CollectionsList />} />
          <Route path="/collections/:collection/:id" element={<CollectionProducts />} />
        </Routes>
      </Router>
    </GraphQLContext.Provider>
  );
}

export default App;
