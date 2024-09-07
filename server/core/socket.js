import { Server } from 'socket.io';

class Socket {
  #connectionsMap;

  constructor() {
    this.io = new Server(process.env.SOCKET_PORT, { cors: { origin: '*' } });
    this.#connectionsMap = new Map();
  }

  #addConnection(userId, connection) {
    let userConnections = this.#connectionsMap.get(userId);
    if (!userConnections) userConnections = new Map();
    userConnections.set(connection.id, connection);
    this.#connectionsMap.set(userId, userConnections);
  }

  #removeConnection(userId, connectionId) {
    if (!this.#connectionsMap.has(userId) || !this.#connectionsMap.get(userId)?.has(connectionId)) {
      throw new Error('UserId or clientId not found in connected clients.');
    }

    this.#connectionsMap.get(userId).delete(connectionId);

    if (this.#connectionsMap.get(userId).size === 0) {
      this.#connectionsMap.delete(userId);
    }
  }

  #getAllClients() {
    let clients = [];
    for (const [_, connections] of this.#connectionsMap) {
      clients = [...clients, ...Array.from(connections.values())];
    }
    return clients;
  }

  #pingClients() {
    const allClients = this.#getAllClients();

    allClients.forEach((client) => {
      if (!client.connected) return client.disconnect(true);
    });
  }

  getConnectionsByUserId(userId) {
    for (const [id, connections] of this.#connectionsMap) {
      if (id === userId) return [...connections].map((item) => item[1]);
    }
    return [];
  }

  setup() {
    console.log('Socket is running');

    this.io.on('connection', (connection) => {
      const { userId } = getParamsFromConnectionRequest(connection.request.url);

      console.log(`[${userId}] Client connected with ID: ${connection.id}`);

      this.#addConnection(userId, connection);

      connection.on('disconnect', () => {
        this.#removeConnection(userId, connection.id);
      });
    });

    setInterval(() => this.#pingClients(), 30_000);
  }
}

function getParamsFromConnectionRequest(requestUrl) {
  const searchParams = new URLSearchParams(requestUrl.replace('/socket.io/', ''));
  if (!requestUrl || !searchParams.has('userId')) {
    throw new Error(`Invalid websocket connection request url: ${requestUrl}`);
  }
  const userId = searchParams.get('userId');
  return { userId };
}

export default new Socket();
