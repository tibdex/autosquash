import { filterBody } from "./filter-body";

test("body without thematic break is left untouched", () => {
  const body = `This is a PR body.
There are multiple lines.

But this is not a thematic break.
But a final new line.`;
  expect(filterBody(body)).toBe(body);
});

test("content after the first thematic break is dropped", () => {
  expect(
    filterBody(`This is a PR body.
There are multiple lines.

-------

But this content is skipped.

-------

And this one too.`),
  ).toMatchInlineSnapshot(`
    "This is a PR body.
    There are multiple lines."
  `);
});

test("uneeded whitespaces are trimmed", () => {
  expect(
    filterBody(`This is a PR body, followed by spaces in the next line.
  \t \t
  -------

  Ignored.`),
  ).toMatchInlineSnapshot(
    `"This is a PR body, followed by spaces in the next line."`,
  );
});
