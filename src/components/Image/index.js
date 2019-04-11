import { PureComponent } from "react";
import { withPageContext } from "../Page";
import { MediaTypes } from "../../constants";

class Image extends PureComponent {
  componentDidMount() {
    this.props.page.registerMedia({
      ...this.props,
      type: MediaTypes.IMAGE
    });
  }

  render() {
    return null;
  }
}

export default withPageContext(Image);
