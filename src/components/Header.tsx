import React from 'react';
import { Link } from 'react-router-dom';
import WalletConnectButton from './WalletConnectButton';

const Header: React.FC = () => {
  return (
    <header className="bg-surface text-text-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">OpenBook</Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/markets" className="hover:text-secondary">Markets</Link></li>
            <li><Link to="/create-market" className="hover:text-secondary">Create Market</Link></li>
            <li><Link to="/settings" className="hover:text-secondary">Settings</Link></li>
            <li><WalletConnectButton /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
