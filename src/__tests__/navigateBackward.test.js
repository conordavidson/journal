import navigateBackward from 'utils/navigateBackward';

it('works', () => {
  expect(navigateBackward(0, -1, 0, -1, 0, 0)).toEqual({
    chapter: -1,
    page: -1,
    media: 0,
  });

  expect(navigateBackward(1, 0, 0, -1, 0, 0, 4)).toEqual({
    chapter: -1,
    page: -1,
    media: 3,
  });

  expect(navigateBackward(1, 0, 2, 1, 0, 0)).toEqual({
    chapter: 0,
    page: 0,
    media: 0,
  });

  expect(navigateBackward(1, 0, 2, 1, 5, 4)).toEqual({
    chapter: 0,
    page: 1,
    media: 3,
  });

  expect(navigateBackward(1, 0, 2, 0, 5, 0)).toEqual({
    chapter: 0,
    page: -1,
    media: 4,
  });

  expect(navigateBackward(1, 0, 2, -1, 5, 0, 3)).toEqual({
    chapter: -1,
    page: 1,
    media: 2,
  });

  expect(navigateBackward(1, 0, 2, -1, 5, 0, 0)).toEqual({
    chapter: -1,
    page: 1,
    media: 0,
  });

  expect(navigateBackward(1, 0, 0, -1, 5, 0, 0)).toEqual({
    chapter: -1,
    page: -1,
    media: 0,
  });
});
