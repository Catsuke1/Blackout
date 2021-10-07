import { Board } from "./Board";
import { getValidQueenMoves, isMoveValid } from "./Chess";
import { Action, Color, GameSettings, Position, SquareTypes } from "./types";
import { EventEmitter } from "events";

export class Game extends EventEmitter {
  gameSettings: GameSettings;
  board: Board;

  turnColor: Color;
  turnAction: Action;

  activePiece: {
    wasClicked: boolean;
    position: Position;
    validMoves: Position[];
  };

  constructor(gameSettings: GameSettings, board: Board) {
    super();

    this.gameSettings = gameSettings;
    this.board = board;

    this.turnColor = this.gameSettings.start.color;
    this.turnAction = this.gameSettings.start.action;

    this.activePiece = {
      wasClicked: false,
      position: undefined,
      validMoves: undefined,
    };

    // setup initial pieces
    for (const whitePiece of this.gameSettings.start.pieces.white) {
      this.board.getSquare(whitePiece).setType(SquareTypes.WhitePiece);
    }

    for (const blackPiece of this.gameSettings.start.pieces.black) {
      this.board.getSquare(blackPiece).setType(SquareTypes.BlackPiece);
    }

    // setup squares
    this.board.forEachSquare((square, position) => {
      square.element.onclick = () => {
        console.log(square.type, position);

        switch (square.type) {
          case SquareTypes.Empty:
            if (this.turnAction === "card") {
              square.setType(SquareTypes.Card);

              this.nextTurn();
            }

            if (this.turnAction === "piece" && this.activePiece.wasClicked) {
              if (isMoveValid(position, this.activePiece.validMoves)) {
                this.board.movePiece(this.activePiece.position, position);

                this.board.clearHighlights();

                this.nextTurn();
              } else {
                this.board.clearHighlights();

                this.resetPiece();
              }
            }
            break;

          case SquareTypes.Card:
            this.board.clearHighlights();

            this.resetPiece();
            break;

          case SquareTypes.WhitePiece:
            if (this.turnAction === "piece" && this.turnColor === "white") {
              if (this.activePiece.wasClicked) {
                this.board.clearHighlights();

                this.resetPiece();
              } else {
                const validMoves = getValidQueenMoves(this.board, position);

                this.board.highlightValidMoves(validMoves);

                this.setActivePiece(position, validMoves);
              }
            }
            break;

          case SquareTypes.BlackPiece:
            if (this.turnAction === "piece" && this.turnColor === "black") {
              if (this.activePiece.wasClicked) {
                this.board.clearHighlights();

                this.resetPiece();
              } else {
                const validMoves = getValidQueenMoves(this.board, position);

                this.board.highlightValidMoves(validMoves);

                this.setActivePiece(position, validMoves);
              }
            }
            break;
        }
      };
    });

    this.displayTurnStatus();
  }

  disableSquaresOnclick() {
    this.board.forEachSquare((square, position) => {
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

  nextTurn() {
    this.turnColor = this.turnColor === "black" ? "white" : "black";

    if (this.turnColor === this.gameSettings.start.color) {
      this.turnAction = this.turnAction === "card" ? "piece" : "card";
    }

    this.resetPiece();
    this.displayTurnStatus();

    const gameCondition = this.checkGameCondition();

    if (gameCondition !== "nowin") {
      const winnerElement = document.getElementById("winner");

      if (gameCondition === "whitewin") {
        winnerElement.innerText = "White wins!";
      } else if (gameCondition === "blackwin") {
        winnerElement.innerText = "Black wins!";
      }

      this.disableSquaresOnclick();
      this.emit("gameover");
    }
  }

  displayTurnStatus() {
    const turnElement = document.getElementById("turn");
    const turnTypeElement = document.getElementById("turnType");

    turnElement.innerText = this.turnColor;
    turnTypeElement.innerText = this.turnAction;
  }

  checkGameCondition() {
    const queens = this.board.getQueenPositions();

    let whiteLost = true;
    let blackLost = true;

    for (const whiteQueen of queens.white) {
      if (getValidQueenMoves(this.board, whiteQueen).length !== 0) {
        whiteLost = false;
        break;
      }
    }

    for (const blackQueen of queens.black) {
      if (getValidQueenMoves(this.board, blackQueen).length !== 0) {
        blackLost = false;
        break;
      }
    }

    if (whiteLost && blackLost) {
      if (this.turnColor === "white") return "blackwin";
      return "whitewin";
    }

    if (whiteLost) {
      return "blackwin";
    }

    if (blackLost) {
      return "whitewin";
    }

    return "nowin";
  }
}
