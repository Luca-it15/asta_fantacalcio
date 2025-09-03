let connectedUsers = [];

export async function handler(event) {
  if (event.httpMethod === "GET") {
    // Ritorna lista utenti
    return {
      statusCode: 200,
      body: JSON.stringify({ users: connectedUsers }),
    };
  }

  if (event.httpMethod === "POST") {
    const { username } = JSON.parse(event.body);

    if (username && !connectedUsers.includes(username)) {
      connectedUsers.push(username);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, users: connectedUsers }),
    };
  }

  if (event.httpMethod === "DELETE") {
    const { username } = JSON.parse(event.body);

    if (username) {
      connectedUsers = connectedUsers.filter((u) => u !== username);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, users: connectedUsers }),
    };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
}
