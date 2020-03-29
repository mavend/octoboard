export const routes = {
  lobby: () => "/",
  login: () => "/login",
  register: () => "/register",
  game: (gameName = ":gameName", gameID = ":gameID") => `/games/${gameName}/${gameID}`,
};
