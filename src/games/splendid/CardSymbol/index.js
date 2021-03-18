import React from "react";
import PropTypes from "prop-types";
import { compact } from "lodash";
import { RESOURCES, RESOURCES_CONFIG } from "../config";
import ResourceIcon from "../ResourceIcon";

import styles from "./CardSymbol.module.css";

const propTypes = {
  resource: PropTypes.oneOf(RESOURCES).isRequired,
  color: PropTypes.string,
  raised: PropTypes.bool,
  disabled: PropTypes.bool,
  count: PropTypes.number,
};

const CardSymbol = ({ resource, count, raised, disabled }) => {
  const { color } = RESOURCES_CONFIG[resource];
  return (
    <div
      className={compact([styles.card, raised && styles.raised, disabled && styles.disabled]).join(
        " "
      )}
      style={{ backgroundColor: color }}
    >
      <ResourceIcon type={resource} color="#ffffff" size={18} />
      {count}
    </div>
  );
};

CardSymbol.propTypes = propTypes;

export default CardSymbol;
