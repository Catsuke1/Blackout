import { SquareTypes } from "./types";

export class Square {
  element: HTMLElement;
  type: SquareTypes;

  highlight: boolean;

  constructor(element: HTMLElement, type: SquareTypes) {
    this.element = element;
    this.setType(type);

    this.highlight = false;
  }

  setHighlight(flag: boolean) {
    this.highlight = flag;

    if (this.highlight) {
      this.element.innerText = "X";
    } else {
      if (this.type === SquareTypes.Empty) {
        this.element.innerText = "";
      }
    }
  }

  setType(type: SquareTypes) {
    this.type = type;

    this.element.classList.toggle("card", this.type === SquareTypes.Card);

    switch (this.type) {
      case SquareTypes.Empty:
        this.element.innerText = "";
        break;

      case SquareTypes.WhitePiece:
        this.element.innerText = "♕";
        break;

      case SquareTypes.BlackPiece:
        this.element.innerText = "♛";
        break;
    }
  }
}
