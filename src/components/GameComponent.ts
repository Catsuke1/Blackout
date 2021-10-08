import { getValidQueenMoves, isMoveValid } from "../game/Chess";
import { Game } from "../game/Game";
import { BoardComponent } from "./BoardComponent";
import { GameElement, Position, SquareTypes } from "../types";

export class GameComponent {
  element: GameElement;

  boardComponent: BoardComponent;

  activePiece: {
    wasClicked: boolean;
    position: Position;
    validMoves: Position[];
  };

  constructor(element: GameElement, game: Game) {
    this.element = element;

    this.boardComponent = new BoardComponent(
      this.element.board,
      game.board.rows,
      game.board.columns
    );

    this.activePiece = {
      wasClicked: false,
      position: undefined,
      validMoves: undefined,
    };

    this.displayTurnStatus(game);
  }

  setGame(game: Game) {
    this.boardComponent.setBoard(game.board);
    this.displayTurnStatus(game);
  }

  displayTurnStatus(game: Game) {
    this.element.turnColor.innerText = game.turnColor;
    this.element.turnAction.innerText = game.turnAction;
  }

  disableSquaresOnclick() {
    this.boardComponent.forEachSquare((square, position) => {
      square.element.onclick = () => {};
    });
  }

  setActivePiece(position: Position, validMoves: Position[]) {
    this.activePiece.wasClicked = true;
    this.activePiece.position = position;
    this.activePiece.validMoves = validMoves;
  }

  resetPiece() {
    this.activePiece.wasClicked = false;
    this.activePiece.position = undefined;
    this.activePiece.validMoves = undefined;
  }
}
