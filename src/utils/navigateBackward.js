export default (
  chapterCount,
  chapterIndex,
  previousChapterPageCount,
  pageIndex,
  previousPageMediaCount,
  mediaIndex,
  previousChapterLastPageMediaCount,
) => {
  let updatedChapterIndex = chapterIndex;
  let updatedPageIndex = pageIndex;
  let updatedMediaIndex = mediaIndex;

  const onFirstMedia = mediaIndex === 0;
  const onFirstPage = pageIndex === -1;
  const onFirstChapter = chapterIndex === -1;

  if (!onFirstMedia) {
    updatedMediaIndex--;
  }

  if (onFirstMedia && !onFirstPage) {
    updatedPageIndex--;
    updatedMediaIndex = previousPageMediaCount === 0 ? 0 : previousPageMediaCount - 1;
  }

  if (onFirstMedia && onFirstPage && !onFirstChapter) {
    updatedChapterIndex--;
    updatedPageIndex = previousChapterPageCount - 1;
    updatedMediaIndex = previousChapterLastPageMediaCount === 0 ? 0 : previousChapterLastPageMediaCount - 1;
  }

  return {
    chapter: updatedChapterIndex,
    page: updatedPageIndex,
    media: updatedMediaIndex,
  };
};
