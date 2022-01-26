import { Connection } from "./Connection";

export class ConnectionList {
  private connections: {
    [id: string]: Connection;
  };

  constructor() {
    this.connections = {};
  }

  add(connection: Connection) {
    this.connections[connection.id] = connection;
  }

  remove(connection: Connection) {
    delete this.connections[connection.id];
  }

  get(id: string) {
    return this.connections[id];
  }

  getAll() {
    return Object.values(this.connections);
  }

  removeAll() {
    this.connections = {};
  }

  count() {
    return Object.values(this.connections).length;
  }
}
