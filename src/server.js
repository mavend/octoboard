const { Kalambury } = require("./games/kalambury/Kalambury");
const { Server } = require("boardgame.io/server");

const server = Server({
  games: [Kalambury],
});
server.run(process.env.PORT || 8000);
