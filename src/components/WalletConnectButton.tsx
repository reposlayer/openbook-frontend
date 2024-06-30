import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletConnectButton: React.FC = () => {
  const { wallet } = useWallet();

  return (
    <WalletMultiButton className="bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      {wallet ? 'Connected' : 'Connect Wallet'}
    </WalletMultiButton>
  );
};

export default WalletConnectButton;