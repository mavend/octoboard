import React from "react";
import PropTypes from "prop-types";

import { OctoHead, Empty, AvatarProps } from "@mavend/octoheads";

const propTypes = {
  uid: PropTypes.string,
  small: PropTypes.bool,
  style: PropTypes.object,
  empty: PropTypes.bool,
  octoHeadProps: PropTypes.InferProps(AvatarProps),
};

const Avatar = ({ uid, small, empty, octoHeadProps, style, ...props }) => {
  const styles = {
    display: "inline-block",
    verticalAlign: "middle",
    width: small ? "40px" : "100%",
    height: small ? "40xp" : "100%",
    ...(style || {}),
  };

  if (empty) {
    return (
      <div style={styles}>
        <Empty />
      </div>
    );
  }

  return (
    <div style={styles} {...props}>
      <OctoHead mask={false} seed={uid} {...octoHeadProps} />
    </div>
  );
};

Avatar.propTypes = propTypes;

export default Avatar;
