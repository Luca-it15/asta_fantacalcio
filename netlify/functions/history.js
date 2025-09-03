let auctionHistory = [];

export async function handler(event) {
  if (event.httpMethod === "GET") {
    // Ritorna tutta la cronologia
    return {
      statusCode: 200,
      body: JSON.stringify({ history: auctionHistory }),
    };
  }

  if (event.httpMethod === "POST") {
    // Aggiunge una nuova asta completata
    const { player, winner, price, timestamp } = JSON.parse(event.body);

    if (player && winner && price) {
      auctionHistory.push({
        player,
        winner,
        price,
        timestamp: timestamp || Date.now(),
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, history: auctionHistory }),
    };
  }

  if (event.httpMethod === "DELETE") {
    // Resetta la cronologia
    auctionHistory = [];
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, history: [] }),
    };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
}
