import { SquareTypes } from "../types";

export class SquareComponent {
  element: HTMLElement;

  highlight: boolean;

  constructor(element: HTMLElement) {
    this.element = element;

    this.highlight = false;
  }

  setHighlight(flag: boolean) {
    this.highlight = flag;

    this.element.classList.toggle("highlight", this.highlight);
  }

  setType(type: SquareTypes) {
    // ♕ ♛

    this.element.classList.toggle("card", type === SquareTypes.Card);

    switch (type) {
      case SquareTypes.Empty:
        this.element.textContent = "";
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
