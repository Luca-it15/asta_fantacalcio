"use client";
import { useState } from "react";
import players from "@/lib/players";
import { sendWS } from "@/lib/ws-client";

export default function AutocompleteSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      const filtered = players
        .filter((p) => p.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const startAuction = (player: string) => {
    sendWS({ type: "AUCTION_START", player });
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <input
        className="w-full px-4 py-2 rounded text-black"
        value={query}
        onChange={handleChange}
        placeholder="Cerca un giocatore..."
      />
      {suggestions.length > 0 && (
        <ul className="bg-white text-black mt-2 rounded shadow">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => startAuction(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => startAuction(query)}
        className="bg-green-500 px-4 py-2 mt-3 rounded text-white"
      >
        Avvia asta
      </button>
    </div>
  );
}