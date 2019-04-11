import React, { PureComponent } from 'react';

export default class Video extends PureComponent {
  render() {
    return (
      <video
        className="events-all"
        ref={this.props.mediaRef}
        width={this.props.width || undefined}
        height={this.props.height || undefined}
        onLoadedMetadata={() => {
          if (this.props.onLoad) this.props.onLoad();
        }}
        controls
      >
        <source src={this.props.src} type="video/mp4" />
      </video>
    );
  }
}
