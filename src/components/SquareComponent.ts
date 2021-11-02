import { SquareTypes } from "../game/types";

export class SquareComponent {
  element: HTMLElement;

  constructor(element: HTMLElement, type: SquareTypes) {
    this.element = element;

    this.setType(type);
  }

  setHighlight(flag: boolean) {
    this.element.classList.toggle("highlight", flag);
  }

  setType(type: SquareTypes) {
    // ♕ ♛

    this.element.classList.toggle("card", type === SquareTypes.Card);

    switch (type) {
      case SquareTypes.Empty:
      case SquareTypes.Card:
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
