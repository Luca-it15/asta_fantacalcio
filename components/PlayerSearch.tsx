'use client';
import { useState } from 'react';
import players from '@/lib/players';

export default function PlayerSearch({ username }: { username: string }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      const filtered = players.filter((p) =>
        p.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const nominate = async (player: string) => {
    if (!player) return;
    await fetch('/api/auction', {
      method: 'POST',
      body: JSON.stringify({ type: 'start', player, user: username }),
    });
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div>
      <h3 className="font-bold mb-2">Nomina un giocatore</h3>
      <input
        className="px-3 py-2 border rounded w-full"
        placeholder="Cerca giocatore..."
        value={query}
        onChange={handleChange}
      />
      <ul className="border mt-2 rounded">
        {suggestions.map((s, i) => (
          <li
            key={i}
            className="px-3 py-1 cursor-pointer hover:bg-gray-100"
            onClick={() => nominate(s)}
          >
            {s}
          </li>
        ))}
      </ul>
      <button
        className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => nominate(query)}
      >
        Avvia Asta
      </button>
    </div>
  );
}
