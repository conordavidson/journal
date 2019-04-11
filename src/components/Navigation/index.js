import React, { Fragment } from "react";

export default ({ navigateForward, navigateBackward }) => (
  <Fragment>
    <div className="Navigation__backward z2" onClick={navigateBackward} />
    <div className="Navigation__forward z2" onClick={navigateForward} />
  </Fragment>
);
