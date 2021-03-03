import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, Redirect } from "react-router-dom";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useUser } from "contexts/UserContext";
import { lobbyClient } from "services/LobbyClient";
import DataStore from "services/DataStore";
import { useBoardGame } from "contexts/BoardGameContext";
import { routes } from "config/routes";

const LeaveButton = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { playerID, matchID, gameName, credentials } = useBoardGame();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState();
  const user = useUser();

  const handleLeave = useCallback(() => {
    lobbyClient
      .leaveMatch(gameName, matchID, { playerID, credentials })
      .then(async () => {
        await DataStore.deleteCredentials(user.uid, matchID);
        history.push(routes.lobby());
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [gameName, matchID, playerID, credentials, user.uid, history]);

  const handleCancel = useCallback(() => {
    setConfirmOpen(false);
  }, [setConfirmOpen]);

  return (
    <>
      {error && <Redirect pass to={{ pathname: routes.lobby(), state: { error: error } }} />}
      <Button color="red" onClick={() => setConfirmOpen(true)}>
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

export default LeaveButton;
