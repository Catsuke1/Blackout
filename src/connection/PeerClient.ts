import Peer, { PeerJSOption } from "peerjs";
import { Connection } from "./Connection";
import { ConnectionClient } from "./ConnectionClient";

export class PeerClient {
  private me: Peer;

  connectionClient!: ConnectionClient;
  id: string | undefined;

  constructor(options?: PeerJSOption) {
    this.me = new Peer(undefined, options);
    this.connectionClient = new ConnectionClient(this.me);

    // Emitted when the peer is destroyed
    this.me.on("close", () => {
      this.connectionClient.disconnectAll();
    });

    // Emitted when the peer is disconnected from the signalling server
    this.me.on("disconnected", () => {
      this.id = undefined;
    });

    // Errors on the peer are almost always fatal and will destroy the peer
    this.me.on("error", (_error) => {
      this.id = undefined;
      this.connectionClient.disconnectAll();
    });

    // Emitted when a new data connection is established from a remote peer
    this.me.on("connection", async (dataConnection) => {
      const connection = await this.connectionClient.addConnection(
        dataConnection
      );

      this.remoteConnection(connection);
    });
  }

  /**
   * Opens the peer and creates a connection client
   * @returns the id of the peer
   */
  async open(): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      this.me.on("open", (id) => {
        this.id = id;

        resolve(id);
      });
    });
  }

  /**
   * Should be used for debugging only
   * @returns the underlying Peer object
   */
  getPeer(): Peer {
    return this.me;
  }

  /**
   * Close the connection to the signalling server
   */
  disconnect(): void {
    this.me.disconnect();
  }

  /**
   * Close the connection to the signalling server
   * and terminate all existing connections
   */
  destroy(): void {
    this.me.destroy();
  }

  isDisconnected(): boolean {
    return this.me.disconnected;
  }

  isDestroyed(): boolean {
    return this.me.destroyed;
  }

  /**
   * Implement this method to access new connections
   * @param _connection new Connection object
   */
  remoteConnection(_connection: Connection): void {}
}
