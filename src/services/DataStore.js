import FirebaseClient from "./Firebase";

const DB = FirebaseClient.firestore();

if (process.env.NODE_ENV === "development") {
  DB.settings({
    host: "localhost:8080",
    ssl: false,
  });
}

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
