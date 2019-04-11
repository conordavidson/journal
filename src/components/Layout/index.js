import React from 'react';

export default ({ children, chapterNumber, pageNumber, mediaNumber, currentChapter }) => {
  const chapterInfo = pageNumber !== -1 && currentChapter ? currentChapter.title : '';
  const chapterIndex = chapterNumber !== -1 ? `Chapter ${chapterNumber + 1}` : '';
  const pageIndex = !!chapterInfo && pageNumber !== -1 ? `Page ${pageNumber + 1}` : '';

  return (
    <>
      <main className="flex justify-center items-center overlay z3 py3 px1 events-none">{children}</main>
      <div className="overlay z1">
        <h4 className="Info__chapter-title">{chapterInfo}</h4>
        <div className="Info__indices">
          <h4>{chapterIndex}</h4>
          <h4 className={!!pageIndex ? 'ml2' : undefined}>{pageIndex}</h4>
        </div>
      </div>
    </>
  );
};
