'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const router = useRouter();

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
      {/* 🔙 Freccia indietro in alto a sinistra */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Indietro</span>
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">📜 Cronologia Aste</h1>

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
