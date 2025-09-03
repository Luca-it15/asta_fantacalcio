'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PlayerSearch from './PlayerSearch';
import Auction from './Auction';

export default function Lobby({ username }: { username: string }) {
  const [auction, setAuction] = useState<any>(null);
  const [bids, setBids] = useState<any[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const router = useRouter();

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

  // Gestione utenti connessi
  useEffect(() => {
    if (!username) return;

    const interval = setInterval(async () => {
      try {
        // aggiungo/aggiorno utente
        await fetch('/.netlify/functions/users', {
          method: 'POST',
          body: JSON.stringify({ username }),
        });

        // leggo lista aggiornata
        const res = await fetch('/.netlify/functions/users');
        if (!res.ok) return;
        const data = await res.json();
        setConnectedUsers(data.users || []);
      } catch (err) {
        console.error('Errore fetch utenti:', err);
      }
    }, 1000);

    // Quando l’utente chiude la pagina o cambia route
    const handleBeforeUnload = async () => {
      try {
        await fetch('/.netlify/functions/users', {
          method: 'DELETE',
          body: JSON.stringify({ username }),
        });
      } catch (err) {
        console.error('Errore delete user:', err);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Rimuovi utente anche quando il componente si smonta
      handleBeforeUnload();
    };
  }, [username]);

  // Funzione logout
  const handleLogout = async () => {
    try {
      await fetch('/.netlify/functions/users', {
        method: 'DELETE',
        body: JSON.stringify({ username }),
      });
    } catch (err) {
      console.error('Errore logout:', err);
    }

    localStorage.removeItem('username');
    router.push('/'); // porta l’utente alla home
  };

  return (
    <div className="p-8 flex gap-8">
      {/* Colonna laterale sinistra */}
      <div className="w-1/4 space-y-4">
        <a href="/history" className="block text-blue-600 underline">
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

        {/* 🔴 Pulsante di logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
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
