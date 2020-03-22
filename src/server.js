const Server = require('boardgame.io/server').Server;
const Kalambury = require('./Kalambury').Kalambury;
const server = Server({ games: [Kalambury] });
server.run(8000);
