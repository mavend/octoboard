import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Icon, Popup } from "semantic-ui-react";

import { BONUSES } from "../config";

import styles from "./InfoPopup.module.scss";

const propTypes = {
  popupHandleRef: PropTypes.object,
  open: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  newWords: PropTypes.arrayOf(PropTypes.object),
  specialBonus: PropTypes.bool,
};

const InfoPopup = ({ popupHandleRef, open, errors, newWords, specialBonus }) => {
  const { t } = useTranslation("scrambled");

  const onMouseMove = useCallback(({ x, y }) => {
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
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  return (
    <Popup
      context={popupHandleRef}
      position="top center"
      open={open}
      offset={[0, 5]}
      style={{ opacity: 0.95, border: 0, borderRadius: 10, background: "#f5f5f5" }}
      popper={{
        id: "words-info-popup",
        style: { pointerEvents: "none", transition: "opacity 0.3s" },
      }}
      flowing
      basic
      header={errors.length > 0 ? t("game.errors.header") : t("game.errors.ok")}
      content={
        errors.length > 0 ? (
          errors.map((error) => {
            return (
              <p key={error}>
                <Icon color="orange" name="warning sign" /> {t(`game.errors.${error}`)}
              </p>
            );
          })
        ) : (
          <>
            {newWords.map(({ letters, points, wordBonuses }, idx) => {
              return (
                <div key={idx} className={styles.letter_wrapper}>
                  <Icon color="green" name="check circle" />
                  {letters.map((letter, jdx) => (
                    <span key={`${idx}-${jdx}`} className={styles.letter}>
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
            })}
            {specialBonus && (
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
            )}
          </>
        )
      }
    />
  );
};

InfoPopup.propTypes = propTypes;
export default InfoPopup;
