export interface ISimpleList<T> {
  capacity: number;
  lines: T[];

  set(...lines: T[]): void;
  append(...lines: T[]): void;
  clear(): void;
}
