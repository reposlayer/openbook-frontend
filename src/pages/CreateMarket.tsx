import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const CreateMarket: React.FC = () => {
  const { openbookService } = useAppContext();
  const { publicKey, signTransaction } = useWallet();
  const [baseMint, setBaseMint] = useState('');
  const [quoteMint, setQuoteMint] = useState('');
  const [baseLotSize, setBaseLotSize] = useState('');
  const [quoteLotSize, setQuoteLotSize] = useState('');
  const [feeRateBps, setFeeRateBps] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(false);

    if (!openbookService) {
      setError('OpenBook service is not initialized');
      setLoading(false);
      return;
    }

    if (!publicKey || !signTransaction) {
      setError('Please connect your wallet');
      setLoading(false);
      return;
    }

    try {
      // Validate inputs
      if (!baseMint || !quoteMint || !baseLotSize || !quoteLotSize || !feeRateBps) {
        throw new Error('All fields are required');
      }

      const baseMintPubkey = new PublicKey(baseMint);
      const quoteMintPubkey = new PublicKey(quoteMint);
      const baseLotSizeNumber = Number(baseLotSize);
      const quoteLotSizeNumber = Number(quoteLotSize);
      const feeRateBpsNumber = Number(feeRateBps);

      if (isNaN(baseLotSizeNumber) || isNaN(quoteLotSizeNumber) || isNaN(feeRateBpsNumber)) {
        throw new Error('Invalid number format');
      }

      const result = await openbookService.createMarket(
        publicKey,
        baseMintPubkey,
        quoteMintPubkey,
        baseLotSizeNumber,
        quoteLotSizeNumber,
        feeRateBpsNumber
      );
      console.log('Market created:', result);
      setSuccess(true);
      // Clear form
      setBaseMint('');
      setQuoteMint('');
      setBaseLotSize('');
      setQuoteLotSize('');
      setFeeRateBps('');
    } catch (err) {
      setError(`Failed to create market: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const isWalletConnected = !!publicKey;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create New Market</h1>
      {!isWalletConnected && (
        <div className="mb-4">
          <p className="text-yellow-500 mb-2">Please connect your wallet to create a market.</p>
          <WalletMultiButton />
        </div>
      )}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          Market created successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="baseMint" className="block mb-1 font-medium">Base Mint (PublicKey)</label>
          <input
            type="text"
            id="baseMint"
            value={baseMint}
            onChange={(e) => setBaseMint(e.target.value)}
            className="w-full p-2 border rounded bg-surface text-text-primary"
            required
            placeholder="Enter base mint public key"
          />
        </div>
        <div>
          <label htmlFor="quoteMint" className="block mb-1 font-medium">Quote Mint (PublicKey)</label>
          <input
            type="text"
            id="quoteMint"
            value={quoteMint}
            onChange={(e) => setQuoteMint(e.target.value)}
            className="w-full p-2 border rounded bg-surface text-text-primary"
            required
            placeholder="Enter quote mint public key"
          />
        </div>
        <div>
          <label htmlFor="baseLotSize" className="block mb-1 font-medium">Base Lot Size</label>
          <input
            type="number"
            id="baseLotSize"
            value={baseLotSize}
            onChange={(e) => setBaseLotSize(e.target.value)}
            className="w-full p-2 border rounded bg-surface text-text-primary"
            required
            placeholder="Enter base lot size"
            min="1"
          />
        </div>
        <div>
          <label htmlFor="quoteLotSize" className="block mb-1 font-medium">Quote Lot Size</label>
          <input
            type="number"
            id="quoteLotSize"
            value={quoteLotSize}
            onChange={(e) => setQuoteLotSize(e.target.value)}
            className="w-full p-2 border rounded bg-surface text-text-primary"
            required
            placeholder="Enter quote lot size"
            min="1"
          />
        </div>
        <div>
          <label htmlFor="feeRateBps" className="block mb-1 font-medium">Fee Rate (bps)</label>
          <input
            type="number"
            id="feeRateBps"
            value={feeRateBps}
            onChange={(e) => setFeeRateBps(e.target.value)}
            className="w-full p-2 border rounded bg-surface text-text-primary"
            required
            placeholder="Enter fee rate in basis points"
            min="0"
            max="10000"
          />
        </div>
        <button 
          type="submit" 
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading || !isWalletConnected}
        >
          {loading ? 'Creating...' : 'Create Market'}
        </button>
      </form>
    </div>
  );
};

export default CreateMarket;