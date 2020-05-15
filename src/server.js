const admin = require("firebase-admin");
const Sentry = require("@sentry/node");
const { Kalambury } = require("./games/kalambury/Game");
const { Splendid } = require("./games/splendid/Game");
const { PictureMatch } = require("./games/picture-match/Game");
const { Scrambled } = require("./games/scrambled/Game");
const { Server } = require("boardgame.io/server");
const { StorageCache } = require("bgio-storage-cache");
const { Firestore } = require("bgio-firebase");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.ENVIRONMENT || "development",
  tracesSampleRate: 1.0,
});

const config = {};

if (process.env.NODE_ENV === "production") {
  config.credential = admin.credential.applicationDefault();
} else {
  config.projectId = "octoboard-development";
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
}

const db = new Firestore({ config });
const dbWithCaching = new StorageCache(db, { cacheSize: 200 });

const server = Server({
  games: [Kalambury, PictureMatch, Splendid, Scrambled],
  db: dbWithCaching,
});

server.app.on("error", (err, ctx) => {
  Sentry.withScope(function (scope) {
    scope.addEventProcessor(function (event) {
      return Sentry.Handlers.parseRequest(event, ctx.request);
    });
    Sentry.captureException(err);
  });
});

server.run(process.env.PORT || 8000);
