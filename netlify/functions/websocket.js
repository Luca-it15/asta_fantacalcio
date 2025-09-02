import { Server } from "ws";

let server = null;
let clients = new Set();

export default async (req, res) => {
  if (!server) {
    server = new Server({ noServer: true });

    server.on("connection", (ws) => {
      clients.add(ws);

      ws.on("message", (message) => {
        for (let client of clients) {
          if (client !== ws && client.readyState === 1) {
            client.send(message);
          }
        }
      });

      ws.on("close", () => {
        clients.delete(ws);
      });
    });
  }

  res.end("WebSocket server attivo 🚀");
};