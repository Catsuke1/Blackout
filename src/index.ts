import { forEach2d } from "./utils";

export function createBoard(
  width: number,
  height: number,
  boardElement: HTMLElement
) {
  const squareElements: HTMLElement[][] = [];

  let isBlack = false;

  for (let row = 0; row < height; row++) {
    const rowElement = document.createElement("div");
    boardElement.appendChild(rowElement);

    rowElement.classList.add("row");

    squareElements.push(new Array<HTMLElement>(width));

    for (let col = 0; col < width; col++) {
      const squareElement = document.createElement("div");
      rowElement.appendChild(squareElement);

      // css
      if (isBlack) squareElement.classList.add("black");
      squareElement.classList.add("square");

      squareElements[row][col] = squareElement;

      isBlack = !isBlack;
    }

    isBlack = !isBlack;
  }

  return squareElements;
}
