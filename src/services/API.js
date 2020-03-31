import { roomsUrl, roomUrl, createGameUrl, joinRoomUrl, leaveGameUrl } from "config/api";

export const apiRequests = {
  fetchRooms: async (games) => {
    const urls = games.map((game) => roomsUrl(game.name));
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const invalidResponses = responses.filter((response) => !response.ok);
    if (invalidResponses.length > 0) {
      const errorMessages = await Promise.all(invalidResponses.map((response) => response.text()));
      throw new Error(errorMessages);
    }
    const jsons = await Promise.all(responses.map((res) => res.json()));
    const rooms = jsons
      .map((res, idx) =>
        res.rooms.map((room) => {
          return { ...room, gameName: games[idx].name };
        })
      )
      .flat();
    return rooms;
  },
  fetchRoom: async (gameName, gameID) => {
    const response = await fetch(roomUrl(gameName, gameID));
    if (response.ok) return await response.json();
    throw new Error(await response.text());
  },
  createRoom: async (gameName, numPlayers, setupData) => {
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
  joinRoom: async (gameName, gameID, playerID, playerName) => {
    const response = await fetch(joinRoomUrl(gameName, gameID), {
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
  leaveGame: async (gameName, gameID, playerID, credentials) => {
    const response = await fetch(leaveGameUrl(gameName, gameID), {
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
