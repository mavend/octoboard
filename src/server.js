const admin = require("firebase-admin");
const { Kalambury } = require("./games/kalambury/Game");
const { Splendid } = require("./games/splendid/Game");
const { PictureMatch } = require("./games/picture-match/Game");
const { Server } = require("boardgame.io/server");
const { StorageCache } = require("bgio-storage-cache");
const { Firestore } = require("bgio-firebase");
const { Notifier } = require("@airbrake/node");
const { GenericAirbrakeNotifier } = require("./services/Airbrake");

let config = {};

if (process.env.NODE_ENV === "development") {
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
  config.projectId = "octoboard-development";
} else {
  config.credential = admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG));
}

const db = new Firestore({ config });
const dbWithCaching = new StorageCache(db, { cacheSize: 200 });

const server = Server({
  games: [Kalambury, PictureMatch, Splendid],
  db: dbWithCaching,
});

server.run(process.env.PORT || 8000, () => {
  const notifier = new GenericAirbrakeNotifier(Notifier);
  server.app.on("error", (err, ctx) => {
    const req = ctx.request;

    err.url = req.url;
    err.action = req.url;
    err.component = err.component || "server";
    err.httpMethod = req.method;
    err.params = req.body;
    err.session = req.session;
    err.ua = req.headers["User-Agent"];

    notifier.notify(err);
  });
});

server.run(process.env.PORT || 8000);
