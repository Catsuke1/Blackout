import { IColoredText } from "./ColoredText";
import { ISimpleList } from "./MyList";

export class ColoredTextList implements ISimpleList<IColoredText> {
  capacity: number;
  lines: IColoredText[];

  constructor(capacity: number) {
    this.capacity = capacity;

    this.lines = [];
  }

  set(...lines: IColoredText[]): void {
    this.lines = lines.slice(-this.capacity);
  }

  append(...lines: IColoredText[]): void {
    this.lines.push(...lines);

    this.lines = this.lines.slice(-this.capacity);
  }

  clear(): void {
    this.lines = [];
  }
}
