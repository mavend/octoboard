import FirebaseClient from "./Firebase";

const DB = FirebaseClient.firestore();

const DataStore = {
  // Public users' profiles
  profiles: DB.collection("public_profiles"),
  fetchProfile: async (uid) => await DataStore.profiles.doc(uid).get(),
  updateProfile: async (uid, profileData) => await DataStore.profiles.doc(uid).set(profileData),
  subscribeProfiles: (callback) => {
    return DataStore.profiles.onSnapshot((snapshot) => {
      const profiles = snapshot.docs.map((doc) => [doc.id, doc.data()]);
      callback(profiles);
    });
  },
  // Game credentials
  credentials: DB.collection("game_credentials"),
  fetchCredentials: async (uid) => await DataStore.credentials.doc(uid).get(),
  setCredentials: async (credentials = {}) => await DataStore.credentials.set(credentials),
  addCredentials: async (uid, gameID, credentials) =>
    await DataStore.credentials.doc(uid).update({ [gameID]: credentials }),
  deleteCredentials: async (uid, gameID) =>
    await DataStore.credentials.doc(uid).update({ [gameID]: null }),
  subscribeCredentials: (uid, callback) => {
    return DataStore.profiles.doc(uid).onSnapshot((doc) => callback(doc.data()));
  },
};

export default DataStore;
