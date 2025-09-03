'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (name.trim()) {
      const roomId = 'main-room';
      localStorage.setItem('username', name);
      router.push(`/room/${roomId}`);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">⚽ Fanta Asta</h1>
      <input
        className="px-4 py-2 border rounded mb-4 w-64"
        placeholder="Inserisci il tuo nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-yellow-400 px-6 py-2 rounded font-semibold"
        onClick={handleLogin}
      >
        Entra
      </button>
    </div>
  );
}
