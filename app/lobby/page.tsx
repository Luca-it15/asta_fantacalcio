"use client";
import { useEffect, useState } from "react";
import { connectWS, sendWS } from "@/lib/ws-client";
import AutocompleteSearch from "@/components/AutocompleteSearch";

export default function Lobby() {
  const [users, setUsers] = useState<string[]>([]);
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : "";

  useEffect(() => {
    connectWS((msg) => {
      if (msg.type === "USERS") setUsers(msg.users);
    });

    if (username) {
      sendWS({ type: "JOIN", user: username });
    }
  }, []);

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl mb-4">Utenti collegati:</h2>
      <ul className="space-y-2">
        {users.map((u, i) => (
          <li key={i} className="bg-green-800 p-2 rounded">{u}</li>
        ))}
      </ul>

      <h3 className="text-xl mt-6 mb-2">Nomina un giocatore:</h3>
      <AutocompleteSearch />
    </div>
  );
}