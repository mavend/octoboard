const { Kalambury } = require("./games/kalambury/Game");
const { Splendid } = require("./games/splendid/Game");
const { PictureMatch } = require("./games/picture-match/Game");
const { Server } = require("boardgame.io/server");

const server = Server({
  games: [Kalambury, PictureMatch, Splendid],
});
server.run(process.env.PORT || 8000);
