export default (
  chapterCount,
  chapterIndex,
  pageCount,
  pageIndex,
  mediaCount,
  mediaIndex
) => {
  let updatedChapterIndex = chapterIndex;
  let updatedPageIndex = pageIndex;
  let updatedMediaIndex = mediaIndex;

  const onLastMedia = mediaIndex >= mediaCount - 1 || mediaCount === 0;
  const onLastPage = pageIndex >= pageCount - 1 || pageCount === 0;
  const onLastChapter = chapterIndex >= chapterCount - 1 || chapterCount === 0;

  if (!onLastMedia) {
    updatedMediaIndex++;
  }

  if (onLastMedia && !onLastPage) {
    updatedPageIndex++;
    updatedMediaIndex = 0;
  }

  if (onLastMedia && onLastPage && !onLastChapter) {
    updatedChapterIndex++;
    updatedPageIndex = -1;
    updatedMediaIndex = 0;
  }

  return {
    chapter: updatedChapterIndex,
    page: updatedPageIndex,
    media: updatedMediaIndex
  };
};
