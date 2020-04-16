import React from "react";
import { oneOf, string, bool } from "prop-types";
import { RESOURCES, RESOURCES_CONFIG } from "../config";
import ResourceIcon from "../ResourceIcon";

import styles from "./CardSymbol.module.css";

const propTypes = {
  resource: oneOf(RESOURCES).isRequired,
  color: string,
  raised: bool,
};

const CardSymbol = ({ resource, count, raised }) => {
  const { color } = RESOURCES_CONFIG[resource];
  return (
    <div
      className={`${styles.card} ${raised ? styles.raised : ""}`}
      style={{ backgroundColor: color }}
    >
      <ResourceIcon type={resource} color="#fff" size={18} />
      {count}
    </div>
  );
};

CardSymbol.propTypes = propTypes;

export default CardSymbol;
