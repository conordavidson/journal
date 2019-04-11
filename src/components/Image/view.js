import React, { PureComponent } from 'react';

export default class Image extends PureComponent {
  state = {
    loaded: false,
  };

  componentWillMount() {
    const loader = new window.Image();
    loader.src = '';
    loader.onload = () => this.didLoad();
    loader.src = this.props.src;
  }

  didLoad() {
    if (this.outOfView) return;
    if (this.props.onLoad) this.props.onLoad();
    this.setState({ loaded: true });
  }

  componentWillUnmount() {
    this.outOfView = true;
  }

  render() {
    return (
      <img
        ref={this.props.mediaRef}
        src={this.props.src}
        alt={'generic'}
        style={{
          width: this.props.width || undefined,
          height: this.props.height || undefined,
          opacity: this.state.loaded ? 1 : 0,
        }}
      />
    );
  }
}
