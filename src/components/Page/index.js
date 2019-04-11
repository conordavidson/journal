import React, { PureComponent, createContext } from "react";
import { withChapterContext } from "../Chapter";

const PageContext = createContext({});
export const withPageContext = WrappedComponent => {
  return class ComponentWithPageContext extends PureComponent {
    render() {
      return (
        <PageContext.Consumer>
          {pageContext => (
            <WrappedComponent {...this.props} page={pageContext} />
          )}
        </PageContext.Consumer>
      );
    }
  };
};

class Page extends PureComponent {
  media = [];

  registerMedia = media => {
    this.media = this.media.concat(media);
  };

  pageContext = {
    registerMedia: this.registerMedia
  };

  componentDidMount() {
    this.props.chapter.registerPage({
      ...this.props,
      media: this.media
    });
  }

  render() {
    return (
      <PageContext.Provider value={this.pageContext}>
        {this.props.children}
      </PageContext.Provider>
    );
  }
}

export default withChapterContext(Page);
