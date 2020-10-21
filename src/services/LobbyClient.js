import { LobbyClient } from "boardgame.io/client";
import { API_ROOT } from "config/api";

export const lobbyClient = new LobbyClient({ server: API_ROOT });

lobbyClient.listAllMatches = async (games) => {
  const responses = await Promise.all(games.map((game) => lobbyClient.listMatches(game.name)));
  return responses
    .map(({ matches }, idx) => matches.map((match) => ({ ...match, gameName: games[idx].name })))
    .flat();
};
