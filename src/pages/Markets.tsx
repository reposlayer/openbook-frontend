import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Market } from '@project-serum/serum';

const Markets: React.FC = () => {
  const { openbookService } = useAppContext();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkets = async () => {
      if (!openbookService) {
        setError('OpenBook service is not initialized');
        setLoading(false);
        return;
      }

      try {
        const fetchedMarkets = await openbookService.getMarkets();
        setMarkets(fetchedMarkets);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch markets');
        setLoading(false);
      }
    };

    fetchMarkets();
  }, [openbookService]);

  if (loading) {
    return <div className="text-center">Loading markets...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Markets</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-surface">
          <thead className="bg-surface-light">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Market
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Base Mint
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Quote Mint
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-light">
            {markets.map((market) => (
              <tr key={market.address.toBase58()}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {market.address.toBase58().slice(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {market.baseMintAddress.toBase58().slice(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {market.quoteMintAddress.toBase58().slice(0, 8)}...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Markets;