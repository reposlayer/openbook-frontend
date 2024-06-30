import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to OpenBook</h1>
      <p className="mb-8">A white-label frontend for OpenBook, inspired by Mango Markets.</p>
      <div className="space-x-4">
        <Link to="/markets" className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">
          View Markets
        </Link>
        <Link to="/create-market" className="bg-secondary text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">
          Create New Market
        </Link>
      </div>
    </div>
  );
};

export default Home;