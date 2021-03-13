const admin = require("firebase-admin");
const { Kalambury } = require("./games/kalambury/Game");
const { Splendid } = require("./games/splendid/Game");
const { PictureMatch } = require("./games/picture-match/Game");
const { Server } = require("boardgame.io/server");
const { StorageCache } = require("bgio-storage-cache");
const { Firestore } = require("bgio-firebase");

let config = {};

if (process.env.NODE_ENV === "production") {
  config.credential = admin.credential.applicationDefault();
} else {
  config.projectId = "octoboard-development";
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
}

const db = new Firestore({ config });
const dbWithCaching = new StorageCache(db, { cacheSize: 200 });

const server = Server({
  games: [Kalambury, PictureMatch, Splendid],
  db: dbWithCaching,
});

server.run(process.env.PORT || 8000);
