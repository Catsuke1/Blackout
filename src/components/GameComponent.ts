import { GameData } from "../data/GameData";
import { Action, Color, GameElement, Position } from "../types";
import { BoardComponent } from "./BoardComponent";
import { EventEmitter } from "events";

export class GameComponent extends EventEmitter {
  gameElement: GameElement;

  boardComponent: BoardComponent;

  activePiece: {
    wasClicked: boolean;
    position: Position;
    validMoves: Position[];
  };

  constructor(element: GameElement, game: GameData) {
    super();

    this.gameElement = element;

    this.boardComponent = new BoardComponent(
      this.gameElement.board,
      game.board
    );

    this.boardComponent.forEachSquare((squareComponent, position) => {
      squareComponent.element.onclick = () => {
        this.emit("click", position);
      };
    });

    this.activePiece = {
      wasClicked: false,
      position: undefined,
      validMoves: undefined,
    };

    this.setGame(game);
  }

  setGame(game: GameData) {
    this.boardComponent.setBoard(game.board);

    if (game.win === "nowin") {
      this.gameElement.turnColor.innerText = game.turn.color;
      this.gameElement.turnAction.innerText = game.turn.action;
    } else {
      this.gameElement.turnColor.innerText = "";
      this.gameElement.turnAction.innerText = "";
    }

    this.gameElement.winner.innerText = game.win;
  }

  setActivePiece(position: Position, validMoves: Position[]) {
    this.activePiece.wasClicked = true;
    this.activePiece.position = position;
    this.activePiece.validMoves = validMoves;

    this.boardComponent.highlightSquares(validMoves);
  }

  resetPiece() {
    this.activePiece.wasClicked = false;
    this.activePiece.position = undefined;
    this.activePiece.validMoves = undefined;

    this.boardComponent.clearHighlights();
  }
}
