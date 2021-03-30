import React from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Button, Icon, Modal } from "semantic-ui-react";

import Tile from "../Tile";
import WordApprovalIcon from "../WordApprovalIcon";

const propTypes = {
  t: PropTypes.func.isRequired,
  newWords: PropTypes.arrayOf(PropTypes.object).isRequired,
  onReject: PropTypes.func,
  onApprove: PropTypes.func,
};

const ApprovalModal = ({ t, newWords, onReject, onApprove }) => (
  <Modal basic dimmer="blurring" open={true}>
    <Modal.Header>{t("game.modals.approval.header")}</Modal.Header>
    <Modal.Content>
      {newWords.map(({ letters, newTiles }, idx) => {
        return (
          <div style={{ display: "flex", flexWrap: "wrap", margin: "20px 0" }} key={idx}>
            <div style={{ margin: "10px" }}>
              <WordApprovalIcon checkedIn={["approval", "full"]} {...{ letters }} />
            </div>
            {letters.map((letter, jdx) => (
              <Tile separate key={jdx} letter={letter} highlighted={newTiles[jdx]} />
            ))}
          </div>
        );
      })}
    </Modal.Content>
    <Modal.Actions>
      <Button color="red" onClick={onReject}>
        <Icon name="close" /> {t("game.modals.approval.reject")}
      </Button>
      <Button color="green" onClick={onApprove}>
        <Icon name="checkmark" /> {t("game.modals.approval.approve")}
      </Button>
    </Modal.Actions>
  </Modal>
);

ApprovalModal.propTypes = propTypes;
export default withTranslation("scrambled")(ApprovalModal);
