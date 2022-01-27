export interface IColoredString {
  text: string;
  color: string;
}

export interface IColoredText {
  parts: IColoredString[];
}

export function coloredStringsTag(
  colors: TemplateStringsArray,
  ...strings: string[]
): IColoredText {
  if (colors.length - 1 !== strings.length) throw "Invalid template literal!";

  const coloredStrings: IColoredString[] = [];

  for (let i = 0; i < strings.length; i++) {
    const color = colors[i].trim();

    coloredStrings.push({ color: color, text: strings[i] });
  }

  return { parts: coloredStrings };
}
