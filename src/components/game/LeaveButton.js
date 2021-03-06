import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Icon, Confirm } from "semantic-ui-react";

const propTypes = {
  handleLeave: PropTypes.func,
};

const defaultProps = {
  handleLeave: () => {},
};

const LeaveButton = ({ handleLeave, ...props }) => {
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleCancel = useCallback(() => {
    setConfirmOpen(false);
  }, [setConfirmOpen]);

  return (
    <>
      <Button icon labelPosition="left" {...props} color="red" onClick={() => setConfirmOpen(true)}>
        <Icon name="close" />
        {t("game.leave.button")}
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={handleCancel}
        onConfirm={handleLeave}
        cancelButton={t("game.leave.modal.cancel")}
        confirmButton={t("game.leave.modal.confirm")}
        content={t("game.leave.modal.content")}
      />
    </>
  );
};

LeaveButton.propTypes = propTypes;
LeaveButton.defaultProps = defaultProps;

export default LeaveButton;
