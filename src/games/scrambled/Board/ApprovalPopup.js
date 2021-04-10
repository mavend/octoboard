import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Icon, Button } from "semantic-ui-react";
import InfoPopup from "./InfoPopup";

const propTypes = {
  popupHandleRef: PropTypes.object,
  open: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  newWords: PropTypes.arrayOf(PropTypes.object),
  specialBonus: PropTypes.bool,
  onReject: PropTypes.func,
  onApprove: PropTypes.func,
};

const ApprovalPopup = ({
  popupHandleRef,
  open,
  errors,
  newWords,
  specialBonus,
  onReject,
  onApprove,
}) => {
  const { t } = useTranslation("scrambled");

  return (
    <InfoPopup clickable {...{ popupHandleRef, open, errors, newWords, specialBonus }}>
      <Button color="red" onClick={onReject}>
        <Icon name="close" /> {t("game.modals.approval.reject")}
      </Button>
      <Button color="green" onClick={onApprove}>
        <Icon name="checkmark" /> {t("game.modals.approval.approve")}
      </Button>
    </InfoPopup>
  );
};

ApprovalPopup.propTypes = propTypes;
export default ApprovalPopup;
