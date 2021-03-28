import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import Tile from "../Tile";
import { BONUSES } from "../config";

import styles from "./Field.module.scss";
import clsx from "clsx";

const dimmerPropTypes = {
  enabled: PropTypes.bool,
};
const Dimmer = ({ enabled }) => (
  <div
    className={clsx({
      [styles.field]: true,
      [styles.dimmer]: true,
      [styles.dimmer_enabled]: enabled,
    })}
  ></div>
);
Dimmer.propTypes = dimmerPropTypes;

const fieldPropTypes = {
  base: PropTypes.object.isRequired,
  overlay: PropTypes.object,
  clickable: PropTypes.bool,
  handleFieldClick: PropTypes.func.isRequired,
  selectionEnabled: PropTypes.bool,
};
const Field = ({ base, overlay, clickable, handleFieldClick, selectionEnabled }) => {
  const { t } = useTranslation("scrambled");

  // Permanently placed letter
  if (base.letter || base.replacement) {
    return (
      <div className={styles.field}>
        <Tile {...base} />
      </div>
    );
  }

  // Empty field with a bonus
  if (base.bonus) {
    const content = base.start ? (
      <Icon name="star" size="big" disabled fitted />
    ) : (
      <div className={styles.bonus}>
        <div className={styles.bonus_multiply}>{base.bonus.multiply}x</div>
        <div className={styles.bonus_type}>{t(`game.info.bonuses.${base.bonus.type}`)}</div>
      </div>
    );
    return (
      <div
        className={clsx({ [styles.field]: true, [styles.field_clickable]: clickable })}
        style={{
          background: BONUSES[base.bonus.type][base.bonus.multiply],
        }}
        onClick={handleFieldClick}
        ref={overlay ? overlay.popupRef : undefined}
      >
        {overlay ? <Tile highlighted bonus={base.bonus} {...overlay} /> : content}
        <Dimmer enabled={selectionEnabled && !clickable} />
      </div>
    );
  }

  // Empty field
  return (
    <div
      className={clsx({ [styles.field]: true, [styles.field_clickable]: clickable })}
      onClick={handleFieldClick}
      ref={overlay ? overlay.popupRef : undefined}
    >
      {overlay ? <Tile highlighted {...overlay} /> : <></>}
      <Dimmer enabled={selectionEnabled && !clickable} />
    </div>
  );
};
Field.propTypes = fieldPropTypes;

export default Field;
