export const API_ROOT = process.env.REACT_APP_API_ROOT || "http://localhost:11080";

export const matchesUrl = (gameName) => `${API_ROOT}/games/${gameName}`;
export const createGameUrl = (gameName) => `${API_ROOT}/games/${gameName}/create`;
export const matchUrl = (gameName, matchID) => `${API_ROOT}/games/${gameName}/${matchID}`;
export const joinMatchUrl = (gameName, matchID) => `${API_ROOT}/games/${gameName}/${matchID}/join`;
export const leaveGameUrl = (gameName, matchID) => `${API_ROOT}/games/${gameName}/${matchID}/leave`;
