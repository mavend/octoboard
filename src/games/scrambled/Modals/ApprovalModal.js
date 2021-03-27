import React from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Button, Icon, Modal } from "semantic-ui-react";

import Tile from "../Tile";

const propTypes = {
  t: PropTypes.func.isRequired,
  newWords: PropTypes.arrayOf(PropTypes.object).isRequired,
  shorts: PropTypes.arrayOf(PropTypes.string).isRequired,
  onReject: PropTypes.func,
  onApprove: PropTypes.func,
};

const ApprovalModal = ({ t, newWords, shorts, onReject, onApprove }) => (
  <Modal basic dimmer="blurring" open={true}>
    <Modal.Header>{t("game.modals.approval.header")}</Modal.Header>
    <Modal.Content>
      {newWords.map(({ letters }, idx) => {
        return (
          <div style={{ display: "flex", flexWrap: "wrap", margin: "20px 0" }} key={idx}>
            {letters.map((letter, jdx) => (
              <Tile separate key={jdx} letter={letter} />
            ))}
            {letters.length <= 3 &&
              (shorts.includes(letters.join("")) ? (
                <Icon name="check circle" color="green" />
              ) : (
                <Icon name="remove circle" color="red" />
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
