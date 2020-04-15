import React from "react";
import { oneOf, number } from "prop-types";
import { RESOURCES, RESOURCES_CONFIG } from "./config";

import styles from "./Resource.module.css";

const propTypes = {
  resource: oneOf(RESOURCES).isRequired,
  points: number,
};
const Resource = ({ resource, points }) => (
  <div
    className={styles.pointsBadge}
    style={{
      backgroundColor: RESOURCES_CONFIG[resource].color,
    }}
  >
    {points}
  </div>
);

Resource.propTypes = propTypes;

export default Resource;
