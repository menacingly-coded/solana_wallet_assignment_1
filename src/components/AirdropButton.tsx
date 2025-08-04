import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';

export const AirdropButton = ({ onAirdrop }: { onAirdrop: () => void }) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  const handleAirdrop = async () => {
    if (!publicKey) return;
    setLoading(true);
    try {
      const signature = await connection.requestAirdrop(publicKey, 1e9); // 1 SOL = 1e9 lamports
      await connection.confirmTransaction(signature, 'confirmed');
      setTxSignature(signature);
      onAirdrop(); // Refresh balance
    } catch (err) {
      console.error('Airdrop failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleAirdrop}
        disabled={!publicKey || loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Airdropping...' : 'Airdrop 1 SOL'}
      </button>

      {txSignature && (
        <p className="text-sm mt-2">
          ✅ Airdrop tx:{" "}
          <a
            href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on Explorer
          </a>
        </p>
      )}
    </div>
  );
};
