import firebase from "firebase/app";
import "firebase/firestore";

if (firebase.apps.length === 0) {
  // Force firebase initialization for local development
  firebase.initializeApp({
    projectId: "octoboard-development",
    apiKey: "development-key",
  });
}
const DB = firebase.firestore();

const settings = {
  experimentalAutoDetectLongPolling: true,
  merge: true,
};

if (process.env.NODE_ENV === "development") {
  settings.host = "localhost:11180";
  settings.ssl = false;
}

DB.settings(settings);

const DataStore = {
  // Public users' profiles
  profiles: DB.collection("users").doc("public_profiles"),
  updateProfile: async (uid, profileData) =>
    await DataStore.profiles.update({ [uid]: profileData }),
  subscribeProfiles: (callback) => {
    return DataStore.profiles.onSnapshot((doc) => doc.exists && callback(doc.data()));
  },
  // Game credentials
  credentials: DB.collection("game_credentials"),
  fetchCredentials: async (uid) => await DataStore.credentials.doc(uid).get(),
  setCredentials: async (uid, credentials = {}) =>
    await DataStore.credentials.doc(uid).set(credentials),
  addCredentials: async (uid, matchID, credentials) =>
    await DataStore.credentials.doc(uid).update({ [matchID]: credentials }),
  deleteCredentials: async (uid, matchID) =>
    await DataStore.credentials.doc(uid).update({ [matchID]: null }),
  subscribeCredentials: (uid, callback) => {
    return DataStore.credentials.doc(uid).onSnapshot((doc) => callback(doc.data()));
  },
};

export default DataStore;
