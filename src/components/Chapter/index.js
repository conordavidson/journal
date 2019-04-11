import React, { PureComponent, createContext } from 'react';
import { withJournalContext } from 'components/Journal';

const ChapterContext = createContext({});
export const withChapterContext = WrappedComponent => {
  return class ComponentWithChapterContext extends PureComponent {
    render() {
      return (
        <ChapterContext.Consumer>
          {chapterContext => <WrappedComponent {...this.props} chapter={chapterContext} />}
        </ChapterContext.Consumer>
      );
    }
  };
};

class Chapter extends PureComponent {
  pages = [];

  registerPage = page => {
    this.pages = this.pages.concat(page);
  };

  chapterContext = {
    registerPage: this.registerPage,
  };

  componentDidMount() {
    this.props.journal.registerChapter({
      ...this.props,
      pages: this.pages,
    });
  }

  render() {
    return <ChapterContext.Provider value={this.chapterContext}>{this.props.children}</ChapterContext.Provider>;
  }
}

export default withJournalContext(Chapter);
