import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Icon, Button } from "semantic-ui-react";
import InfoPopup from "./InfoPopup";
import { newWords } from "../utils";
import { useBoardGame } from "contexts/BoardGameContext";

const propTypes = {
  popupHandleRef: PropTypes.object,
  errors: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string.isRequired,
  tiles: PropTypes.arrayOf(PropTypes.object),
};

const WordsPopup = ({ popupHandleRef, errors, type, tiles }) => {
  const {
    G: { board },
    moves: { Approve },
  } = useBoardGame();
  const { t } = useTranslation("scrambled");

  if (type === "approval") {
    return (
      <InfoPopup
        clickable
        newWords={newWords(board, tiles)}
        specialBonus={tiles.length === 7}
        {...{ popupHandleRef, errors }}
      >
        <Button color="red" onClick={() => Approve(false)}>
          <Icon name="close" /> {t("game.modals.approval.reject")}
        </Button>
        <Button color="green" onClick={() => Approve(true)}>
          <Icon name="checkmark" /> {t("game.modals.approval.approve")}
        </Button>
      </InfoPopup>
    );
  }

  return (
    <InfoPopup
      newWords={newWords(board, tiles)}
      specialBonus={tiles.length === 7}
      {...{ popupHandleRef, errors }}
    ></InfoPopup>
  );
};

WordsPopup.propTypes = propTypes;
export default WordsPopup;
