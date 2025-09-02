"use client";
import { useEffect, useState } from "react";
import { connectWS, sendWS } from "../../../lib/ws-client";

export default function Room({ params }: { params: { id: string } }) {
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : "";

  useEffect(() => {
    connectWS((msg) => {
      if (msg.type === "USERS") setUsers(msg.users);
      if (msg.type === "MESSAGE") setMessages((prev) => [...prev, msg]);
    });
    sendWS({ type: "JOIN", user: username, room: params.id });
  }, []);

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl mb-4">Stanza: {params.id}</h2>
      <h3 className="mb-2">Utenti collegati:</h3>
      <ul className="space-y-2 mb-4">
        {users.map((u, i) => (
          <li key={i} className="bg-green-800 p-2 rounded">{u}</li>
        ))}
      </ul>
      <button
        className="bg-green-500 px-4 py-2 rounded"
        onClick={() => sendWS({ type: "MESSAGE", user: username, text: "Ha avviato l'asta!" , room: params.id })}
      >
        Avvia asta
      </button>
      <div className="mt-6">
        <h3 className="mb-2">Log:</h3>
        <ul className="space-y-1">
          {messages.map((m, i) => (
            <li key={i} className="text-sm">{m.user}: {m.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}