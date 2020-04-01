export const routes = {
  lobby: () => "/",
  login: () => "/login",
  login_guest: () => "/login/guest",
  register: () => "/register",
  change_password: () => "/change_password",
  game: (gameName = ":gameName", gameID = ":gameID") => `/games/${gameName}/${gameID}`,
};
