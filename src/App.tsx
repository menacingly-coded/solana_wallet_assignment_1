import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import { AirdropButton } from './components/AirdropButton';

function App() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  const fetchBalance = async () => {
    if (publicKey) {
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / 1e9); // convert lamports to SOL
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [publicKey]);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">⚡ Solana Wallet Connect</h1>
      <WalletMultiButton />
      {publicKey && (
        <div className="mt-4">
          <p><strong>Wallet Address:</strong> {publicKey.toBase58()}</p>
          <p><strong>SOL Balance:</strong> {balance ?? 'Loading...'} SOL</p>
          <AirdropButton onAirdrop={fetchBalance} />
        </div>
      )}
    </div>
  );
}

export default App;
