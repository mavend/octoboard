import DataStore from "services/DataStore";
import { lobbyClient } from "services/LobbyClient";
import { routes } from "config/routes";

function leaveGame(gameName, matchID, playerID, playerUID, credentials, navigate) {
  lobbyClient
    .leaveMatch(gameName, matchID, { playerID, credentials })
    .then(async () => {
      await DataStore.deleteCredentials(playerUID, matchID);
      navigate(routes.lobby());
    })
    .catch((e) => {
      navigate(routes.lobby(), { error: e.message });
    });
}

export { leaveGame };
