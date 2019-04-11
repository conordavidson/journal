import navigateForward from "../utils/navigateForward";

it("works", () => {
  expect(navigateForward(0, -1, 0, -1, 0, 0)).toEqual({
    chapter: -1,
    page: -1,
    media: 0
  });

  expect(navigateForward(1, -1, 0, -1, 0, 0)).toEqual({
    chapter: 0,
    page: -1,
    media: 0
  });

  expect(navigateForward(5, 4, 0, -1, 0, 0)).toEqual({
    chapter: 4,
    page: -1,
    media: 0
  });

  expect(navigateForward(5, 4, 3, 1, 0, 0)).toEqual({
    chapter: 4,
    page: 2,
    media: 0
  });

  expect(navigateForward(5, 4, 3, 1, 1, 0)).toEqual({
    chapter: 4,
    page: 2,
    media: 0
  });

  expect(navigateForward(5, 4, 3, 1, 3, 2)).toEqual({
    chapter: 4,
    page: 2,
    media: 0
  });

  expect(navigateForward(5, 4, 1, 0, 3, 2)).toEqual({
    chapter: 4,
    page: 0,
    media: 2
  });

  expect(navigateForward(5, 4, 1, 0, 4, 2)).toEqual({
    chapter: 4,
    page: 0,
    media: 3
  });

  expect(navigateForward(6, 4, 3, 2, 4, 3)).toEqual({
    chapter: 5,
    page: -1,
    media: 0
  });
});
