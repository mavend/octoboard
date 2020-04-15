import React from "react";
import { oneOf, number } from "prop-types";

import { RESOURCES, RESOURCES_CONFIG } from "./config";
import Resource from "./Resource";

import styles from "./Resource.module.css";

const propTypes = {
  type: oneOf(RESOURCES).isRequired,
  count: number,
};
const ResourceToken = ({ type, count }) => {
  const { color } = RESOURCES_CONFIG[type];
  return (
    <div className={styles.token} style={{ backgroundColor: color }}>
      {count}
      <div className={styles.iconBadge}>
        <Resource type={type} />
      </div>
    </div>
  );
};

ResourceToken.propTypes = propTypes;

export default ResourceToken;
