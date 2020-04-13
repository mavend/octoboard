const { Kalambury } = require("./games/kalambury/Game");
const { PictureMatch } = require("./games/picture-match/Game");
const { Server } = require("boardgame.io/server");

const server = Server({
  games: [Kalambury, PictureMatch],
});
server.run(process.env.PORT || 8000);
