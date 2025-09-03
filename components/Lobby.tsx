'use client';
import { useEffect, useState } from 'react';
import PlayerSearch from './PlayerSearch';
import Auction from './Auction';

export default function Lobby({ username }: { username: string }) {
  const [auction, setAuction] = useState<any>(null);
  const [bids, setBids] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/auction');
      const data = await res.json();
      setAuction(data.auction);
      setBids(data.bids);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 flex gap-8">
      <div className="w-1/4">
        <a href="/history" className="block text-blue-600 underline mb-4">
          Vai alla Cronologia
        </a>
      </div>
      <div className="flex-1">
        {!auction ? (
          <PlayerSearch username={username} />
        ) : (
          <Auction username={username} auction={auction} bids={bids} />
        )}
      </div>
    </div>
  );
}
