import { matchesUrl, matchUrl, createGameUrl, joinMatchUrl, leaveGameUrl } from "config/api";

export const apiRequests = {
  fetchMatches: async (games) => {
    const urls = games.map((game) => matchesUrl(game.name));
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const invalidResponses = responses.filter((response) => !response.ok);
    if (invalidResponses.length > 0) {
      const errorMessages = await Promise.all(invalidResponses.map((response) => response.text()));
      throw new Error(errorMessages);
    }
    const jsons = await Promise.all(responses.map((res) => res.json()));
    const matches = jsons
      .map((res, idx) =>
        res.matches.map((match) => {
          return { ...match, gameName: games[idx].name };
        })
      )
      .flat();
    return matches;
  },
  fetchMatch: async (gameName, matchID) => {
    const response = await fetch(matchUrl(gameName, matchID));
    if (response.ok) return await response.json();
    throw new Error(await response.text());
  },
  createMatch: async (gameName, numPlayers, setupData) => {
    const response = await fetch(createGameUrl(gameName), {
      method: "POST",
      body: JSON.stringify({
        numPlayers,
        setupData,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) return await response.json();
    throw new Error(await response.text());
  },
  joinMatch: async (gameName, matchID, playerID, playerName) => {
    const response = await fetch(joinMatchUrl(gameName, matchID), {
      method: "POST",
      body: JSON.stringify({
        playerID,
        playerName,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) return await response.json();
    throw new Error(await response.text());
  },
  leaveGame: async (gameName, matchID, playerID, credentials) => {
    const response = await fetch(leaveGameUrl(gameName, matchID), {
      method: "POST",
      body: JSON.stringify({
        playerID,
        credentials,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) return await response.json();
    throw new Error(await response.text());
  },
};
