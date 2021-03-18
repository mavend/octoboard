import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon, Confirm } from "semantic-ui-react";
import { compact } from "lodash";

import { RESOURCES, RESOURCES_CONFIG } from "../config";
import ResourceIcon from "../ResourceIcon";

import styles from "./ResourceToken.module.css";

const propTypes = {
  type: PropTypes.oneOf(RESOURCES).isRequired,
  count: PropTypes.number,
  raised: PropTypes.bool,
  big: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};

const ResourceToken = ({ type, count, raised, big, disabled, onClick, onDelete }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { color } = RESOURCES_CONFIG[type] || {};

  const handleDelete = () => {
    onDelete();
    setConfirmOpen(false);
  };

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
            onConfirm={handleDelete}
            onCancel={() => setConfirmOpen(false)}
          />
        </>
      )}
    </div>
  );
};

ResourceToken.propTypes = propTypes;

export default ResourceToken;
