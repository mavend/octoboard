import { Server } from "boardgame.io/server";
import { Firestore } from "bgio-firebase";
import { StorageCache } from "bgio-storage-cache";
import admin from "firebase-admin";
import * as Sentry from "@sentry/node";

import { Kalambury } from "games/kalambury/Game";
import { Splendid } from "games/splendid/Game";
import { PictureMatch } from "games/picture-match/Game";
import { Scrambled } from "games/scrambled/Game";

export {};

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.ENVIRONMENT || "development",
  tracesSampleRate: 1.0,
});

const config: admin.AppOptions = {};

if (process.env.NODE_ENV === "production") {
  if (process.env.FIREBASE_KEY_PATH) {
    const serviceAccount = require(process.env.FIREBASE_KEY_PATH);
    config.credential = admin.credential.cert(serviceAccount);
  } else {
    config.credential = admin.credential.applicationDefault();
  }
} else {
  config.projectId = "octoboard-development";
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:11180";
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

server.run(parseInt(process.env.PORT || "8000"));
