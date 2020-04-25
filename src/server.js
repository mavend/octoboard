const { Kalambury } = require("./games/kalambury/Kalambury");
const { Splendor } = require("./games/splendor/Game");
const { Server } = require("boardgame.io/server");

const server = Server({
  games: [Kalambury, Splendor],
});
server.run(process.env.PORT || 8000);
