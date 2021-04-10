import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Icon, Popup } from "semantic-ui-react";

import { BONUSES } from "../config";
import clsx from "clsx";

import WordApprovalIcon from "../WordApprovalIcon";

import styles from "./InfoPopup.module.scss";

const newWordsListPropTypes = {
  newWords: PropTypes.arrayOf(PropTypes.object).isRequired,
  clickable: PropTypes.bool,
};
const NewWordsList = ({ newWords, clickable }) =>
  newWords.map(({ letters, newTiles, points, wordBonuses }, idx) => {
    return (
      <div key={idx} className={styles.letter_wrapper}>
        <WordApprovalIcon
          checkedIn={clickable ? ["approval", "full"] : ["full"]}
          {...{ letters }}
        />
        {letters.map((letter, jdx) => (
          <span
            key={`${idx}-${jdx}`}
            className={clsx({
              [styles.letter]: true,
              [styles.letter_new]: newTiles[jdx],
            })}
          >
            {letter}
          </span>
        ))}
        {wordBonuses.map((multiply, jdx) => (
          <span
            key={`${idx}-${jdx}`}
            className={styles.bonus_wrapper}
            style={{
              background: BONUSES.word[multiply],
            }}
          >
            x{multiply}
          </span>
        ))}
        <span className={styles.points_wrapper}>{points}</span>
      </div>
    );
  });
NewWordsList.propTypes = newWordsListPropTypes;

const specialBonusInfoPropTypes = {
  t: PropTypes.func.isRequired,
};
const SpecialBonusInfo = ({ t }) => (
  <div className={styles.letter_wrapper}>
    <Icon color="yellow" name="winner" />
    {t("game.info.bonus")}
    <span
      className={styles.bonus_wrapper}
      style={{
        background: "#16ab39",
      }}
    >
      +50
    </span>
  </div>
);
SpecialBonusInfo.propTypes = specialBonusInfoPropTypes;

const errorsListPropTypes = {
  t: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
const ErrorsList = ({ t, errors }) =>
  errors.map((error) => {
    return (
      <p key={error}>
        <Icon color="orange" name="warning sign" /> {t(`game.errors.${error}`)}
      </p>
    );
  });
ErrorsList.propTypes = errorsListPropTypes;

const basePopupPropTypes = {
  popupHandleRef: PropTypes.object.isRequired,
  clickable: PropTypes.bool,
  header: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
};
const BasePopup = ({ popupHandleRef, clickable, header, content }) => (
  <Popup
    context={popupHandleRef}
    position="top center"
    open={true}
    offset={[0, 5]}
    style={{ opacity: 0.95, border: 0, borderRadius: 10, background: "#f5f5f5" }}
    popper={{
      id: "words-info-popup",
      style: { pointerEvents: clickable ? "auto" : "none", transition: "opacity 0.3s" },
    }}
    flowing
    basic
    header={header}
    content={content}
  />
);
BasePopup.propTypes = basePopupPropTypes;

const propTypes = {
  popupHandleRef: PropTypes.object.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  newWords: PropTypes.arrayOf(PropTypes.object),
  specialBonus: PropTypes.bool,
  clickable: PropTypes.bool,
};
const InfoPopup = ({ popupHandleRef, errors, newWords, specialBonus, clickable, children }) => {
  const { t } = useTranslation("scrambled");

  const onMouseMove = useCallback(
    ({ x, y }) => {
      if (clickable) return;
      // Viewport relative coordinates
      const popup = document.getElementById("words-info-popup");
      if (popup) {
        const rect = popup.getBoundingClientRect();
        popup.style.transition = "opacity 0.3s, transform 0.3s";
        if (
          x >= rect.left - 10 &&
          x <= rect.right + 10 &&
          y >= rect.top - 10 &&
          y <= rect.bottom + 10
        ) {
          popup.style.opacity = 0;
        } else {
          popup.style.opacity = 1.0;
        }
      }
    },
    [clickable]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  if (errors.length > 0) {
    return (
      <BasePopup
        header={t("game.errors.header")}
        content={<ErrorsList {...{ t, errors }} />}
        {...{ popupHandleRef, clickable }}
      />
    );
  }

  return (
    <BasePopup
      header={t("game.errors.ok")}
      content={
        <>
          <NewWordsList {...{ newWords, clickable }} />
          {specialBonus && <SpecialBonusInfo {...{ t }} />}
          {children}
        </>
      }
      {...{ popupHandleRef, clickable }}
    />
  );
};

InfoPopup.propTypes = propTypes;
export default InfoPopup;
