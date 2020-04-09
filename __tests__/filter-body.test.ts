import { filterBody } from "../src/autosquash";

test("leaves simple body untouched", () => {
  const body = `This is a PR body.
  There is multiple lines.
  
  But this is not horizontal rules.
  But a final new line.
  `;
  expect(filterBody(body)).toBe(body);
});

test("drops content after horizontal rule", () => {
  const body = `This is a PR body.
There is multiple lines.

-------

But this content is skipped.
`;
  const expected = `This is a PR body.
There is multiple lines.`;
  expect(filterBody(body)).toBe(expected);
});

test("considers only the first horizontal rule", () => {
  const body = `This is a PR body.

-------

But this content is skipped.

-------

This is also skipped.
`;
  const expected = `This is a PR body.`;
  expect(filterBody(body)).toBe(expected);
});

test("drop dumb whitespaces before rulers", () => {
  const body = `This is a PR body, followed by spaces in the next line.
\t \t
-------

Ignored.`;
  const expected = `This is a PR body, followed by spaces in the next line.`;
  expect(filterBody(body)).toBe(expected);
});

const createLine = (char: string, count: number): string => {
  let line = "";
  for (let i = 0; i < count; i += 1) {
    line += char;
  }

  return line;
};

["-", "*", "_"].forEach(ruler => {
  test(`supports ${ruler} as ruler`, () => {
    const body = `This is the PR body

${createLine(ruler, 5)}
And this is ignored`;

    expect(filterBody(body)).toBe("This is the PR body");
  });

  test(`requires a minimal number (3+) of ${ruler} to match`, () => {
    const body = `Whole body to keep.

${createLine(ruler, 2)}
Even this section.

${createLine(ruler, 1)}
And the final one.`;

    expect(filterBody(body)).toBe(body);
  });
});

test("ignores - used for headers", () => {
  const body = `This PR has titles to keep.

Commit title
-------

We don't want this to be discarded.`;

  expect(filterBody(body)).toBe(body);
});
