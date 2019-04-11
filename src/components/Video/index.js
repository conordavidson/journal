import { PureComponent } from 'react';
import { withPageContext } from 'components/Page';
import { MediaTypes } from 'constants';

class Video extends PureComponent {
  componentDidMount() {
    this.props.page.registerMedia({
      ...this.props,
      type: MediaTypes.VIDEO,
    });
  }

  render() {
    return null;
  }
}

export default withPageContext(Video);
