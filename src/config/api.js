export const API_ROOT = process.env.REACT_APP_API_ROOT || "http://localhost:8000";

export const roomsUrl = (gameName) => `${API_ROOT}/games/${gameName}`;
export const createGameUrl = (gameName) => `${API_ROOT}/games/${gameName}/create`;
export const roomUrl = (gameName, gameID) => `${API_ROOT}/games/${gameName}/${gameID}`;
export const joinRoomUrl = (gameName, gameID) => `${API_ROOT}/games/${gameName}/${gameID}/join`;
export const leaveGameUrl = (gameName, gameID) => `${API_ROOT}/games/${gameName}/${gameID}/leave`;
