import { roomsUrl, roomUrl, createGameUrl, joinRoomUrl, leaveGameUrl } from "config/api";

export const apiRequests = {
  fetchRooms: async (games) => {
    const urls = games.map((game) => roomsUrl(game.name));
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const jsons = await Promise.all(responses.map(async (res) => await res.json()));
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
    return await response.json();
  },
  createRoom: async (gameName, numPlayers) => {
    const response = await fetch(createGameUrl(gameName), {
      method: "POST",
      body: JSON.stringify({
        numPlayers,
      }),
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
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
    return await response.json();
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
    return await response.json();
  },
};
