import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, Redirect } from "react-router-dom";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useUser } from "contexts/UserContext";
import { apiRequests } from "services/API";
import DataStore from "services/DataStore";
import { useBoardGame } from "contexts/BoardGameContext";
import { routes } from "config/routes";

const LeaveButton = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { playerID, gameID, gameName, credentials } = useBoardGame();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState();
  const user = useUser();

  const handleLeave = () => {
    apiRequests
      .leaveGame(gameName, gameID, playerID, credentials)
      .then(async () => {
        await DataStore.deleteCredentials(user.uid, gameID);
        history.push(routes.lobby());
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <>
      {error && <Redirect pass to={{ pathname: routes.lobby(), state: { error: error } }} />}
      <Button color="red" onClick={() => setConfirmOpen(true)}>
        <Icon name="close" />
        {t("game.leave.button")}
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleLeave}
        cancelButton={t("game.leave.modal.cancel")}
        confirmButton={t("game.leave.modal.confirm")}
        content={t("game.leave.modal.content")}
      />
    </>
  );
};

export default LeaveButton;
