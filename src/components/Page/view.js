import React, { PureComponent, createRef } from 'react';
import Media from '../Media';

const VERTICAL_PADDING = 96;
const HORIZONTAL_PADDING = 32;

export default class PageView extends PureComponent {
  state = {
    mediaHeight: null,
    mediaWidth: null,
  };

  mediaRef = createRef();
  captionRef = createRef();

  componentDidUpdate(prevProps) {
    if (this.props.media && prevProps.media.src !== this.props.media.src) {
      this.scaleMedia();
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.scaleMedia);
    this.scaleMedia();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.scaleMedia);
  }

  availableHeight = () => {
    const caption = this.captionRef.current;
    if (!caption) return;

    const captionHeight = caption.offsetHeight;
    return window.innerHeight - (captionHeight + VERTICAL_PADDING);
  };

  availableWidth = () => window.innerWidth - HORIZONTAL_PADDING;

  scaleMedia = () => {
    const media = this.mediaRef.current;

    if (!media) return;

    let mediaWidth;
    let mediaHeight;

    switch (media.tagName) {
      case 'VIDEO':
        mediaWidth = media.videoWidth;
        mediaHeight = media.videoHeight;
        break;
      default:
      case 'IMG':
        mediaWidth = media.width;
        mediaHeight = media.height;
        break;
    }

    const mediaAspectRatio = mediaWidth / mediaHeight;

    const availableHeight = this.availableHeight();
    const availableWidth = this.availableWidth();

    if (availableHeight * mediaAspectRatio < availableWidth) {
      this.setState({ mediaHeight: availableHeight, mediaWidth: 'auto' });
    } else {
      this.setState({ mediaHeight: 'auto', mediaWidth: '100%' });
    }
  };

  render() {
    return (
      <div className="text-center h100 w100 relative">
        <div className="flex justify-center items-center" style={{ height: this.availableHeight() }}>
          <Media
            {...this.props.media}
            onLoad={this.scaleMedia}
            mediaRef={this.mediaRef}
            width={this.state.mediaWidth}
            height={this.state.mediaHeight}
          />
        </div>
        <div ref={this.captionRef} className="Page__caption pt2 absolute b0 w100">
          <h1>{this.props.heading}</h1>
          <p>{this.props.caption}</p>
        </div>
      </div>
    );
  }
}
