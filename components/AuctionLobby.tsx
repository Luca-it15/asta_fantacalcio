'use client';

import { useEffect, useState } from 'react';
import PlayerSearch from './PlayerSearch';
import Auction from './Auction';

export default function AuctionLobby({ username }: { username: string }) {
  const [auction, setAuction] = useState<any>(null);
  const [bids, setBids] = useState<any[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

  // Polling per asta e puntate
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/auction');
        if (!res.ok) return;
        const data = await res.json();
        setAuction(data.auction);
        setBids(data.bids);
      } catch (err) {
        console.error('Errore fetch auction:', err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Polling per utenti connessi (via Netlify Function)
  useEffect(() => {
    if (!username) return;

    const interval = setInterval(async () => {
      try {
        // aggiungo l'utente (POST)
        await fetch('/.netlify/functions/users', {
          method: 'POST',
          body: JSON.stringify({ username }),
        });

        // leggo la lista aggiornata (GET)
        const res = await fetch('/.netlify/functions/users');
        if (!res.ok) return;
        const data = await res.json();
        setConnectedUsers(data.users || []);
      } catch (err) {
        console.error('Errore fetch utenti:', err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [username]);

  return (
    <div className="p-8 flex gap-8">
      {/* Colonna laterale sinistra */}
      <div className="w-1/4">
        <a href="/history" className="block text-blue-600 underline mb-4">
          Vai alla Cronologia
        </a>

        {/* Utenti connessi */}
        <div className="bg-gray-100 rounded p-4 shadow">
          <h3 className="font-semibold mb-2">Utenti connessi</h3>
          {connectedUsers.length === 0 ? (
            <p className="text-sm text-gray-500">Nessun utente collegato</p>
          ) : (
            <ul>
              {connectedUsers.map((user, i) => (
                <li
                  key={i}
                  className="py-1 border-b last:border-none text-gray-800"
                >
                  {user}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Colonna principale */}
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
