import { Vector2 } from "src/utils/Vector2";
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
  playerNumber: number;

  newGameRequest: Who;

  scoreboard: Vector2<number>;

  constructor() {
    this.connectionId = undefined;
    this.connected = false;
    this.myColor = undefined;

    this.newGameRequest = undefined;

    this.scoreboard = [0, 0];
  }

  setupConnection(connection: Connection, myColor: Color): void {
    this.connectionId = connection.id;
    this.connected = true;
    this.myColor = myColor;

    this.scoreboard = [0, 0];
  }

  closeConnection(): void {
    this.connectionId = undefined;
    this.connected = false;
    this.myColor = undefined;

    this.newGameRequest = undefined;

    this.scoreboard = [0, 0];
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

  setWinner(who: Who): void {
    if (who === Who.Me) {
      this.scoreboard[0]++;
    } else {
      this.scoreboard[1]++;
    }
  }
}
