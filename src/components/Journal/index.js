/* @flow */
import React, { PureComponent, createContext } from 'react';

import uuid from 'uuid/v4';
import get from 'lodash/get';
import navigateForward from '../../utils/navigateForward';
import navigateBackward from '../../utils/navigateBackward';
import Navigation from '../Navigation';
import Layout from '../Layout';
import JournalView from './view';
import ChapterView from '../Chapter/view';
import PageView from '../Page/view';
import 'styles/index.scss';

const JournalContext = createContext({});
export const withJournalContext = WrappedComponent => {
  return class ComponentWithJournalContext extends PureComponent {
    render() {
      return (
        <JournalContext.Consumer>
          {journalContext => <WrappedComponent {...this.props} journal={journalContext} />}
        </JournalContext.Consumer>
      );
    }
  };
};

export default class Journal extends PureComponent {
  state = {
    chapterNumberVisible: -1,
    pageNumberVisible: -1,
    mediaNumberVisible: 0,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown, false);
    const segments = window.location.pathname.split('/').filter(e => !!e);
    if (segments.length < 3) return;

    const chapterNumber = parseInt(segments[segments.length - 3]) - 1;
    const pageNumber = parseInt(segments[segments.length - 2]) - 1;
    const mediaNumber = parseInt(segments[segments.length - 1]);

    if (chapterNumber !== -1 && !get(this, `chapters.${chapterNumber}`)) return;
    if (pageNumber !== -1 && !get(this, `chapters.${chapterNumber}.pages.${pageNumber}`)) return;
    if (mediaNumber !== 0 && !get(this, `chapters.${chapterNumber}.pages.${pageNumber}.media.${mediaNumber}`)) return;

    this.setState({
      chapterNumberVisible: chapterNumber,
      pageNumberVisible: pageNumber,
      mediaNumberVisible: mediaNumber,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown, false);
  }

  chapters = [];

  registerChapter = chapter => {
    this.chapters = this.chapters.concat(chapter);
    this.forceUpdate();
  };

  currentChapter = chapterNumber => this.chapters[chapterNumber];
  currentPage = (chapterNumber, pageNumber) => {
    const currentChapter = this.currentChapter(chapterNumber);
    if (!currentChapter || !currentChapter.pages) return null;
    return currentChapter.pages[pageNumber];
  };
  currentMedia = (chapterNumber, pageNumber, mediaNumber) => {
    const currentPage = this.currentPage(chapterNumber, pageNumber);
    if (!currentPage || !currentPage.media) return null;
    return currentPage.media[mediaNumber];
  };

  navigateForward = () => {
    const { chapterNumberVisible, pageNumberVisible, mediaNumberVisible } = this.state;

    const currentChapter = this.currentChapter(chapterNumberVisible);
    const currentPage = this.currentPage(chapterNumberVisible, pageNumberVisible);

    const chapterCount = this.chapters.length;
    const currentPageCount = currentChapter ? currentChapter.pages.length : 0;
    const currentMediaCount = currentPage ? currentPage.media.length : 0;

    const { chapter, page, media } = navigateForward(
      chapterCount,
      chapterNumberVisible,
      currentPageCount,
      pageNumberVisible,
      currentMediaCount,
      mediaNumberVisible,
    );

    this.setState(
      {
        chapterNumberVisible: chapter,
        pageNumberVisible: page,
        mediaNumberVisible: media,
      },
      this.syncHistory,
    );
  };

  navigateBackward = () => {
    const { chapterNumberVisible, pageNumberVisible, mediaNumberVisible } = this.state;

    const previousChapter = this.currentChapter(chapterNumberVisible - 1);
    const previousPage = this.currentPage(chapterNumberVisible, pageNumberVisible - 1);

    const chapterCount = this.chapters.length;
    const previousChapterPageCount = previousChapter ? previousChapter.pages.length : 0;
    const previousChapterLastPageMediaCount =
      previousChapter && previousChapter.pages[previousChapterPageCount - 1]
        ? previousChapter.pages[previousChapterPageCount - 1].media.length
        : 0;
    const previousPageMediaCount = previousPage ? previousPage.media.length : 0;

    const { chapter, page, media } = navigateBackward(
      chapterCount,
      chapterNumberVisible,
      previousChapterPageCount,
      pageNumberVisible,
      previousPageMediaCount,
      mediaNumberVisible,
      previousChapterLastPageMediaCount,
    );

    this.setState(
      {
        chapterNumberVisible: chapter,
        pageNumberVisible: page,
        mediaNumberVisible: media,
      },
      this.syncHistory,
    );
  };

  syncHistory = () => {
    const { chapterNumberVisible, pageNumberVisible, mediaNumberVisible } = this.state;
    const url = `${process.env.PUBLIC_URL}/${chapterNumberVisible + 1}/${pageNumberVisible + 1}/${mediaNumberVisible}`;
    window.history.pushState(null, null, url);
  };

  onKeyDown = ({ keyCode }) => {
    if (keyCode === 37) this.navigateBackward();
    if (keyCode === 39) this.navigateForward();
  };

  journalContext = {
    registerChapter: this.registerChapter,
  };

  renderCurrent = () => {
    const { chapterNumberVisible, pageNumberVisible, mediaNumberVisible } = this.state;

    const currentChapter = this.currentChapter(chapterNumberVisible);
    const currentPage = this.currentPage(chapterNumberVisible, pageNumberVisible);
    const currentMedia = this.currentMedia(chapterNumberVisible, pageNumberVisible, mediaNumberVisible);

    let content = null;

    if (this.state.chapterNumberVisible === -1) {
      content = <JournalView {...this.props} />;
    } else if (this.state.pageNumberVisible === -1) {
      content = <ChapterView {...currentChapter} />;
    } else {
      content = <PageView key={uuid()} {...currentPage} media={currentMedia} />;
    }

    return (
      <Layout
        chapterNumber={this.state.chapterNumberVisible}
        pageNumber={this.state.pageNumberVisible}
        mediaNumber={this.state.mediaNumberVisible}
        currentChapter={currentChapter}
        currentPage={currentPage}
      >
        {content}
      </Layout>
    );
  };

  render() {
    return (
      <JournalContext.Provider value={this.journalContext}>
        <Navigation navigateForward={this.navigateForward} navigateBackward={this.navigateBackward} />
        {this.renderCurrent()}
        {this.props.children}
      </JournalContext.Provider>
    );
  }
}
