"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (name.trim()) {
      const roomId = Math.random().toString(36).substring(7);
      localStorage.setItem("username", name);
      router.push(`/room/${roomId}`);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-4xl mb-6 font-bold">⚽ Fanta Asta</h1>
      <input
        className="px-4 py-2 rounded text-black mb-4"
        placeholder="Inserisci il tuo nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-green-500 px-6 py-2 rounded"
        onClick={handleLogin}
      >
        Entra
      </button>
    </div>
  );
}