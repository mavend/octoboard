export const routes = {
  lobby: () => "/",
  login: () => "/login",
  login_guest: () => "/login/guest",
  register: () => "/register",
  game: (gameName = ":gameName", gameID = ":gameID") => `/games/${gameName}/${gameID}`,
};
