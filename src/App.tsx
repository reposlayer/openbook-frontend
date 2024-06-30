import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Markets from './pages/Markets';
import CreateMarket from './pages/CreateMarket';
import Settings from './pages/Settings';

require('@solana/wallet-adapter-react-ui/styles.css');

const App: React.FC = () => {
  const wallets = [new PhantomWalletAdapter()];

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-background text-text-primary">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/create-market" element={<CreateMarket />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WalletModalProvider>
    </WalletProvider>
  );
};

export default App;