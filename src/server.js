const { Kalambury } = require("./games/kalambury/Game");
const { Splendor } = require("./games/splendor/Game");
const { PictureMatch } = require("./games/picture-match/Game");
const { Server } = require("boardgame.io/server");

const server = Server({
  games: [Kalambury, PictureMatch, Splendor],
});
server.run(process.env.PORT || 8000);
