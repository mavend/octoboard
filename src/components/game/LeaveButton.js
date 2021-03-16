import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Icon, Confirm } from "semantic-ui-react";

const propTypes = {
  handleLeave: PropTypes.func,
};

const defaultProps = {
  icon: true,
  handleLeave: () => {},
};

const LeaveButton = ({ handleLeave, icon, ...props }) => {
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleCancel = useCallback(() => {
    setConfirmOpen(false);
  }, [setConfirmOpen]);

  return (
    <>
      <Button
        icon={icon}
        labelPosition={icon ? "left" : undefined}
        color="red"
        onClick={() => setConfirmOpen(true)}
        {...props}
      >
        {icon && <Icon name="close" />}
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
