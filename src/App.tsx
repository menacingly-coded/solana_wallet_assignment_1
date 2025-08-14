import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';

function App() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const lamports = await connection.getBalance(publicKey);
        setBalance(lamports / 1e9); // convert to SOL
      }
    };
    fetchBalance();
  }, [publicKey, connection]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1> Solana Wallet Connection</h1>
      <WalletMultiButton />
      {publicKey && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Wallet Address:</strong> {publicKey.toBase58()}</p>
          <p><strong>SOL Balance:</strong> {balance ?? 'Loading...'} SOL</p>
        </div>
      )}
    </div>
  );
}

export default App;
