import React, { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Button, Icon, Modal } from "semantic-ui-react";

import Tile from "../Tile";

const propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string),
  setBlankTileReplacement: PropTypes.func,
  blankTileReplacement: PropTypes.string,
  onClose: PropTypes.func,
};

const BlankTileModal = ({ letters, setBlankTileReplacement, blankTileReplacement, onClose }) => {
  const { t } = useTranslation("scrambled");

  const onKeyDown = useCallback(
    ({ key }) => {
      if (letters.includes(key.toUpperCase())) {
        setBlankTileReplacement(key.toUpperCase());
      }
      if (key === "Enter") {
        onClose();
      }
    },
    [letters, onClose, setBlankTileReplacement]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <Modal
      dimmer="blurring"
      size="tiny"
      open={open}
      closeOnEscape={false}
      closeOnDimmerClick={false}
    >
      <Modal.Header>{t("game.modals.blank.header")}</Modal.Header>
      <Modal.Content>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {letters.map((letter, idx) => (
            <div key={idx} style={{ margin: 5 }}>
              <Tile
                letter={letter}
                raised={blankTileReplacement === letter} // check if selected blank letter is this one
                onClick={() => setBlankTileReplacement(letter)} // mark this letter as blank replacement
              />
            </div>
          ))}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" disabled={!blankTileReplacement} onClick={onClose}>
          <Icon name="checkmark" /> {t("game.modals.blank.confirm")}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

BlankTileModal.propTypes = propTypes;
export default BlankTileModal;
