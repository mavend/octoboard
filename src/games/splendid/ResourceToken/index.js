import React, { useState } from "react";
import { oneOf, number, bool } from "prop-types";
import { Icon, Confirm } from "semantic-ui-react";
import { compact } from "lodash";

import { RESOURCES, RESOURCES_CONFIG } from "../config";
import ResourceIcon from "../ResourceIcon";

import styles from "./ResourceToken.module.css";

const propTypes = {
  type: oneOf(RESOURCES).isRequired,
  count: number,
  raised: bool,
};

const ResourceToken = ({ type, count, raised, big, disabled, onClick, onDelete }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { color } = RESOURCES_CONFIG[type] || {};

  return (
    <div
      className={compact([
        styles.token,
        raised && styles.raised,
        big && styles.big,
        onClick && !disabled && styles.active,
        disabled && styles.disabled,
      ]).join(" ")}
      style={{ backgroundColor: color }}
      onClick={disabled ? undefined : onClick}
    >
      {count}
      <div className={styles.iconBadge}>
        <ResourceIcon type={type} />
      </div>
      {!disabled && onDelete && (
        <>
          <Icon
            name="trash"
            size="tiny"
            circular
            color="black"
            title="Discard 1 token"
            onClick={() => setConfirmOpen(true)}
            className={styles.iconRemove}
          />
          <Confirm
            content={`Do you want to discard 1 token?`}
            open={confirmOpen}
            onConfirm={onDelete}
            onCancel={() => setConfirmOpen(false)}
          />
        </>
      )}
    </div>
  );
};

ResourceToken.propTypes = propTypes;

export default ResourceToken;
