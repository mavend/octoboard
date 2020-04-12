import FirebaseClient from "./Firebase";
import DataStore from "./DataStore";
import { avatarForName } from "utils/avatar";

async function initUserProfile(user, { displayName }) {
  const photoURL = avatarForName(user.uid);
  await DataStore.updateProfile(user.uid, { displayName, photoURL });
  await DataStore.setCredentials(user.uid, {});
  await user.updateProfile({ displayName, photoURL });
}

const FirebaseAuth = FirebaseClient.auth();

const AuthProvider = {
  logInAnonymously: async (displayName) => {
    const { user } = await FirebaseAuth.signInAnonymously();
    if (!user) throw new Error("No user in response");
    await initUserProfile(user, { displayName });
    return user;
  },
  logIn: async (email, password) => {
    const { user } = await FirebaseAuth.signInWithEmailAndPassword(email, password);
    if (!user) throw new Error("No user in response");
    return user;
  },
  logInGoogle: async () => {
    const provider = new FirebaseClient.auth.GoogleAuthProvider();
    provider.addScope("email");
    provider.addScope("profile");
    provider.setCustomParameters({ prompt: "select_account" });

    const { user } = await FirebaseAuth.signInWithPopup(provider);
    if (!user) throw new Error("No user in response");
    const { displayName } = user;
    await initUserProfile(user, { displayName });
    return user;
  },
  register: async (displayName, email, password) => {
    const { user } = await FirebaseAuth.createUserWithEmailAndPassword(email, password);
    if (!user) throw new Error("No user in response");
    await initUserProfile(user, { displayName });
    return user;
  },
  logout: async () => {
    return await FirebaseAuth.signOut();
  },
  changePassword: async (currentPassword, newPassword) => {
    const user = FirebaseAuth.currentUser;
    if (user) {
      const credential = FirebaseClient.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);
    } else {
      throw new Error("Something went wrong");
    }
  },
  onAuthChange: (callback) => {
    return FirebaseAuth.onAuthStateChanged(callback);
  },
};

export default AuthProvider;
