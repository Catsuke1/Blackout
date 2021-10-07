import { forEach2d, make2dArray } from "./utils";

export function createSquareElements(
  width: number,
  height: number,
  boardElement: HTMLElement
) {
  const squareElements = make2dArray<HTMLElement>(width, height);

  let isBlack = false;
  let rowElement = document.createElement("div");

  forEach2d(squareElements, (element, row, column) => {
    if (column === 0) {
      rowElement = document.createElement("div");
      boardElement.appendChild(rowElement);

      rowElement.classList.add("row");

      isBlack = !isBlack;
    }

    const squareElement = document.createElement("div");
    rowElement.appendChild(squareElement);

    squareElement.classList.add("square");
    if (isBlack) squareElement.classList.add("black");

    squareElements[row][column] = squareElement;

    isBlack = !isBlack;
  });

  return squareElements;
}
