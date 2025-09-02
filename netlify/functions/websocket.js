import { Server } from "ws";

let server = null;
let rooms = {};

export default async (req, res) => {
  if (!server) {
    server = new Server({ noServer: true });

    server.on("connection", (ws) => {
      ws.on("message", (raw) => {
        const msg = JSON.parse(raw.toString());
        const room = msg.room || "default";
        if (!rooms[room]) rooms[room] = new Set();
        rooms[room].add(ws);

        if (msg.type === "JOIN") {
          ws.username = msg.user;
          broadcast(room, { type: "USERS", users: Array.from(rooms[room]).map(c => c.username).filter(Boolean) });
        }

        if (msg.type === "MESSAGE") {
          broadcast(room, msg);
        }
      });

      ws.on("close", () => {
        for (let room in rooms) {
          rooms[room].delete(ws);
          broadcast(room, { type: "USERS", users: Array.from(rooms[room]).map(c => c.username).filter(Boolean) });
        }
      });
    });
  }

  res.end("WebSocket server attivo 🚀");
};

function broadcast(room, msg) {
  for (let client of rooms[room] || []) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(msg));
    }
  }
}