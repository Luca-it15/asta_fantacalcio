'use client';
import { useState } from 'react';

export default function Auction({
  username,
  auction,
  bids,
}: {
  username: string;
  auction: any;
  bids: any[];
}) {
  const [bid, setBid] = useState('');

  const placeBid = async () => {
    const amount = bid
      ? parseInt(bid)
      : bids.length
      ? bids[bids.length - 1].amount + 1
      : 1;

    await fetch('/api/auction', {
      method: 'POST',
      body: JSON.stringify({ type: 'bid', user: username, amount }),
    });
    setBid('');
  };

  const endAuction = async () => {
    await fetch('/api/auction', {
      method: 'POST',
      body: JSON.stringify({ type: 'end' }),
    });

    if (bids.length > 0) {
      const highest = bids.reduce((a, b) => (b.amount > a.amount ? b : a));
      const history = JSON.parse(localStorage.getItem('auctionHistory') || '[]');
      const newEntry = {
        player: auction.player,
        winner: highest.user,
        price: highest.amount,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('auctionHistory', JSON.stringify([...history, newEntry]));
    }
  };

  const highest =
    bids.length > 0 ? bids.reduce((a, b) => (b.amount > a.amount ? b : a)) : null;

  return (
    <div>
      <h3 className="text-xl font-bold mb-3">Asta per: {auction.player}</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          className="px-3 py-2 border rounded"
          placeholder="Offerta..."
          value={bid}
          onChange={(e) => setBid(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 rounded" onClick={placeBid}>
          Punta
        </button>
        <button className="bg-red-500 text-white px-4 rounded" onClick={endAuction}>
          Fine Battitura
        </button>
      </div>
      <ul className="space-y-1">
        {bids.map((b, i) => (
          <li
            key={i}
            className={`px-3 py-1 rounded ${highest && b.amount === highest.amount ? "bg-yellow-200" : "bg-gray-100"}`}
          >
            {b.user}: €{b.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
