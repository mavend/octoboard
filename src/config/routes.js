export const routes = {
  lobby: () => "/",
  login: () => "/login",
  login_guest: () => "/login/guest",
  register: () => "/register",
  change_password: () => "/change_password",
  game: (gameName = ":gameName", matchID = ":matchID") => `/games/${gameName}/${matchID}`,
};
