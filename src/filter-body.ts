import { parsers } from "prettier/parser-markdown";

// Return the content before the first thematic break (https://github.github.com/gfm/#thematic-breaks).
// We don't use a regex because text such as `---` could also be found in Markdown code blocks but they shouldn't be considered as thematic breaks there.
// The simplest is to use a good Markdown parser such as the one used by Prettier.
const filterBody = (body: string): string => {
  const trimmedBody = body.trim();
  // The function actually does not need 3 parameters, it can be called with a single one.
  // @ts-expect-error
  const { children } = parsers.markdown.parse(trimmedBody);
  const firstThematicBreak = children.find(
    ({ type }: { type: string }) => type === "thematicBreak",
  );
  return firstThematicBreak === undefined
    ? trimmedBody
    : trimmedBody.slice(0, firstThematicBreak.position.start.offset).trim();
};

export { filterBody };
