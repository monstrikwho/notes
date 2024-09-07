import Socket from '#core/socket';

class Notes {
  constructor() {
    this._service = 'Notes';
    this.notes = [];
  }

  list = async () => {
    return { payload: { data: this.notes.slice().reverse() } };
  };

  create = async (body, query, headers) => {
    const { message } = body;
    const userId = headers['user-id'];

    const userConnections = Socket.getConnectionsByUserId(userId);

    const id = (this.notes.slice(-1)[0]?.id || 0) + 1;
    const data = { id, message };

    if (this.notes.length === 9) {
      const removed = this.notes.shift();
      userConnections.forEach((connection) => {
        connection.emit('delete', removed);
      });
    }

    this.notes.push(data);

    userConnections.forEach((connection) => {
      connection.emit('create', data);
    });

    return { payload: { data } };
  };

  clear = async (body, query, headers) => {
    const userId = headers['user-id'];

    const userConnections = Socket.getConnectionsByUserId(userId);

    this.notes = [];

    userConnections.forEach((connection) => {
      connection.emit('clear');
    });

    return { payload: { data: null } };
  };
}

export default new Notes();
