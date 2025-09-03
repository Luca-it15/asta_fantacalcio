'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  // Carica cronologia dal backend
  useEffect(() => {
    fetch('/.netlify/functions/history')
      .then((res) => res.json())
      .then((data) => setHistory(data.history || []))
      .catch((err) => console.error('Errore fetch history:', err));
  }, []);

  // Reset cronologia condivisa
  const clearHistory = async () => {
    await fetch('/.netlify/functions/history', {
      method: 'DELETE',
    });
    setHistory([]);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📜 Cronologia Aste</h1>
        <Link href="/lobby">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Torna all'Asta
          </button>
        </Link>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-600">Nessuna asta completata ancora.</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Giocatore</th>
                <th className="border border-gray-300 px-4 py-2">Vincitore</th>
                <th className="border border-gray-300 px-4 py-2">Prezzo</th>
                <th className="border border-gray-300 px-4 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{h.player}</td>
                  <td className="border border-gray-300 px-4 py-2">{h.winner}</td>
                  <td className="border border-gray-300 px-4 py-2">€{h.price}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(h.timestamp).toLocaleString('it-IT')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={clearHistory}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset Cronologia
          </button>
        </>
      )}
    </div>
  );
}
