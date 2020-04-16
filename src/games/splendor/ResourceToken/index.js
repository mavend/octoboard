import React from "react";
import { oneOf, number, bool } from "prop-types";

import { RESOURCES, RESOURCES_CONFIG } from "../config";
import ResourceIcon from "../ResourceIcon";

import styles from "./ResourceToken.module.css";

const propTypes = {
  type: oneOf(RESOURCES).isRequired,
  count: number,
  raised: bool,
};

const ResourceToken = ({ type, count, raised }) => {
  const { color } = RESOURCES_CONFIG[type];
  return (
    <div
      className={`${styles.token} ${raised ? styles.raised : ""}`}
      style={{ backgroundColor: color }}
    >
      {count}
      <div className={styles.iconBadge}>
        <ResourceIcon type={type} />
      </div>
    </div>
  );
};

ResourceToken.propTypes = propTypes;

export default ResourceToken;
