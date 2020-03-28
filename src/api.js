export const API_ROOT = "http://localhost:8000";

export const roomsUrl = (gameName) => `${API_ROOT}/games/${gameName}`;
export const createGameUrl = (gameName) => `${API_ROOT}/games/${gameName}/create`;
export const joinRoomUrl = (gameName, gameID) => `${API_ROOT}/games/${gameName}/${gameID}/join`;
export const leaveGameUrl = (gameName, gameID) => `${API_ROOT}/games/${gameName}/${gameID}/leave`;
