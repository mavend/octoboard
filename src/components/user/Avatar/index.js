import React from "react";
import PropTypes from "prop-types";

import { OctoHead, Empty } from "@mavend/octoheads";

const propTypes = {
  uid: PropTypes.string,
  small: PropTypes.bool,
  style: PropTypes.object,
  empty: PropTypes.bool,
};

const Avatar = ({ uid, small, empty, ...props }) => {
  const styles = {
    display: "inline-block",
    verticalAlign: "middle",
    width: small ? "40px" : "100%",
    height: small ? "40xp" : "100%",
    ...props.style,
  };

  if (empty) {
    return (
      <div style={styles}>
        <Empty />
      </div>
    );
  }

  return (
    <div style={styles}>
      <OctoHead mask={false} seed={uid} />
    </div>
  );
};

Avatar.propTypes = propTypes;

export default Avatar;
