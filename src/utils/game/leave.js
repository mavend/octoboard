import DataStore from "services/DataStore";
import { lobbyClient } from "services/LobbyClient";
import { routes } from "config/routes";

function leaveGame(gameName, matchID, playerID, playerUID, credentials, history) {
  lobbyClient
    .leaveMatch(gameName, matchID, { playerID, credentials })
    .then(async () => {
      await DataStore.deleteCredentials(playerUID, matchID);
      history.push(routes.lobby());
    })
    .catch((e) => {
      history.push(routes.lobby(), { error: e.message });
    });
}

export { leaveGame };
