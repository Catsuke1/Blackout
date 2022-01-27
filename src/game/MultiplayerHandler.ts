import { Connection } from "../connection/Connection";
import { Color } from "./GameData";

export enum Who {
  Me,
  Them,
}

export class MultiplayerHandler {
  connectionId: string;
  connected: boolean;
  myColor: Color;

  newGameRequest: Who;

  constructor() {
    this.connectionId = undefined;
    this.connected = false;
    this.myColor = undefined;

    this.newGameRequest = undefined;
  }

  setupConnection(connection: Connection, myColor: Color): void {
    this.connectionId = connection.id;
    this.connected = true;
    this.myColor = myColor;
  }

  closeConnection(): void {
    this.connectionId = undefined;
    this.connected = false;
    this.myColor = undefined;

    this.newGameRequest = undefined;
  }

  requestNewGame(who: Who): boolean {
    console.log("new game request by", who);

    if (this.newGameRequest === undefined) {
      this.newGameRequest = who;
      return false;
    }

    // previous requester is not equal to current requester
    if (who !== this.newGameRequest) {
      // do new game
      this.newGameRequest = undefined;
      return true;
    }

    return false;
  }
}
