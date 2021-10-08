import { Board } from "../game/Board";
import { forEach2d, make2dArray } from "../utils";
import { SquareComponent } from "./SquareComponent";
import { Position, SquareTypes, toPos } from "../types";

export class BoardComponent {
  element: HTMLElement;

  squareComponents: SquareComponent[][];

  constructor(element: HTMLElement, board: Board) {
    this.element = element;

    this.squareComponents = make2dArray<SquareComponent>(
      board.rows,
      board.columns
    );

    let isBlack = false;
    let rowElement: HTMLElement;

    forEach2d(this.squareComponents, (_, row, column) => {
      if (column === 0) {
        rowElement = document.createElement("div");
        this.element.appendChild(rowElement);

        rowElement.classList.add("row");

        isBlack = !isBlack;
      }

      const squareElement = document.createElement("div");
      rowElement.appendChild(squareElement);

      squareElement.classList.add("square");
      if (isBlack) squareElement.classList.add("black");

      this.squareComponents[row][column] = new SquareComponent(squareElement);
      this.squareComponents[row][column].setType(
        board.getSquareType(toPos(row, column))
      );

      isBlack = !isBlack;
    });
  }

  setBoard(board: Board) {
    board.forEachSquareType((type, position) => {
      this.squareComponents[position.row][position.column].setType(type);
    });
  }

  setSquare(position: Position, type: SquareTypes) {
    this.squareComponents[position.row][position.column].setType(type);
  }

  getSquare(position: Position) {
    return this.squareComponents[position.row][position.column];
  }

  forEachSquare(fn: (square: SquareComponent, position: Position) => void) {
    forEach2d(this.squareComponents, (square, row, column) => {
      fn(square, toPos(row, column));
    });
  }

  highlightSquares(positions: Position[]) {
    for (const position of positions) {
      this.getSquare(position).setHighlight(true);
    }
  }

  clearHighlights() {
    this.forEachSquare((square, position) => {
      if (square.highlight) {
        square.setHighlight(false);
      }
    });
  }
}
