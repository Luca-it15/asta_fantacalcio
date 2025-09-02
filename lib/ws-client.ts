let socket: WebSocket | null = null;

export function connectWS(onMessage: (msg: any) => void) {
  socket = new WebSocket("wss://TUO_DOMINIO.netlify.app/.netlify/functions/websocket");

  socket.onopen = () => console.log("🔌 WS connesso");
  socket.onmessage = (event) => onMessage(JSON.parse(event.data));
}

export function sendWS(data: any) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
}