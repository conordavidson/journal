import React, { PureComponent } from "react";
import { MediaTypes } from "../../constants";
import ImageView from "../Image/view";
import VideoView from "../Video/view";

export default class Media extends PureComponent {
  render() {
    switch (this.props.type) {
      case MediaTypes.IMAGE:
        return <ImageView {...this.props} />;
      case MediaTypes.VIDEO:
        return <VideoView {...this.props} />;
      default:
        return null;
    }
  }
}
