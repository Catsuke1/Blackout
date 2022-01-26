import Peer, { DataConnection, PeerConnectOption } from "peerjs";
import { Connection } from "./Connection";
import { ConnectionList } from "./ConnectionList";

export class ConnectionClient {
  private me: Peer;

  list: ConnectionList;

  constructor(peer: Peer) {
    this.me = peer;

    this.list = new ConnectionList();
  }

  setupDataConnection(connection: Connection): void {
    connection.getDataConnection().on("data", (data) => {
      this.recieve(data, connection.id);
    });

    connection.getDataConnection().on("close", () => {
      this.list.remove(connection);
    });

    connection.getDataConnection().on("error", (_error) => {
      this.list.remove(connection);
    });
  }

  async addConnection(dataConnection: DataConnection): Promise<Connection> {
    const connection = new Connection(dataConnection);
    await connection.open();

    this.setupDataConnection(connection);
    this.list.add(connection);

    return connection;
  }

  /**
   * Establishes a connection with another peer
   * @param id connection id
   * @param options connection options
   * @returns a new Connection object
   */
  async connect(id: string, options?: PeerConnectOption): Promise<Connection> {
    const dataConnection = this.me.connect(id, options);

    const connection = await this.addConnection(dataConnection);

    return connection;
  }

  disconnect(id: string): void {
    const connection = this.list.get(id);
    connection.close();

    this.list.remove(connection);
  }

  disconnectAll(): void {
    this.list.getAll().forEach((connection) => {
      connection.close();
    });

    this.list.removeAll();
  }

  send(data: any, ...ids: string[]): void {
    ids.forEach((id) => {
      const connection = this.list.get(id);
      if (connection === undefined) return;

      if (connection.isOpen()) {
        connection.send(data);
      } else {
        this.list.remove(connection);
      }
    });
  }

  sendAll(data: any): void {
    this.list.getAll().forEach((connection) => {
      if (connection.isOpen()) {
        connection.send(data);
      } else {
        this.list.remove(connection);
      }
    });
  }

  /**
   * Implement this method to access data recieved from connections
   * @param _data data recieved from the connection
   * @param _id id of the peer on the other end
   */
  recieve(_data: any, _id: string): void {}
}
