export const routes = {
  lobby: () => "/",
  login: () => "/login",
  game: (gameName = ":gameName", gameID = ":gameID") => `/games/${gameName}/${gameID}`,
};
