import FirebaseClient from "./Firebase";

export class UserClient {
  constructor(updater) {
    this.user = null;
    this.updateUser = () => {
      updater(this.user);
    };

    this.logIn = this.logIn.bind(this);
    this.logInGoogle = this.logInGoogle.bind(this);
    this.logInAnonymously = this.logInAnonymously.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    this.getNickName = this.getNickName.bind(this);
    this.setNickName = this.setNickName.bind(this);
    this.getUserDBRef = this.getUserDBRef.bind(this);
    this.init();
  }

  async logInAnonymously(nickname) {
    const response = await FirebaseClient.auth().signInAnonymously();
    this.user = response.user;
    await this.setNickName(nickname);
  }

  async logIn(email, password) {
    const response = await FirebaseClient.auth().signInWithEmailAndPassword(email, password);
    if (response.user) {
      this.user = response.user;
      return response;
    } else {
      throw new Error("No user in response");
    }
  }

  async logInGoogle() {
    const provider = new FirebaseClient.auth.GoogleAuthProvider();
    provider.addScope("email");
    provider.addScope("profile");
    provider.setCustomParameters({ prompt: "select_account" });

    const response = await FirebaseClient.auth().signInWithPopup(provider);
    if (response.user) {
      this.user = response.user;
      await this.setNickName(this.user.displayName);
    } else {
      throw new Error("No user in response");
    }
    return this.user;
  }

  async logout() {
    try {
      await FirebaseClient.auth().signOut();
      this.user = null;
      this.updateUser();
      return true;
    } catch (error) {
      return error;
    }
  }

  async setNickName(nickname) {
    await this.getUserDBRef().set({
      nickname: nickname,
    });
  }

  async getNickName(uid) {
    const result = await this.getUserDBRef(uid).get();
    if (result.exists && result.data()) {
      return result.data().nickname;
    } else {
      return "Guest";
    }
  }

  async register(nickname, email, password) {
    const response = await FirebaseClient.auth().createUserWithEmailAndPassword(email, password);
    await this.setNickName(nickname);
    return response;
  }

  async changePassword(password) {
    const user = FirebaseClient.auth().currentUser;
    if (user) {
      return user.updatePassword(password);
    }
    return Promise.reject("Something went wrong");
  }

  async sendResetPasswordLink(email) {
    return FirebaseClient.auth().sendPasswordResetEmail(email);
  }

  init() {
    FirebaseClient.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user = user;
        this.getUserDBRef().onSnapshot((doc) => {
          const userData = doc.data();
          if (userData) {
            this.user.nickname = doc.data().nickname;
            this.updateUser();
          }
        });
        this.updateUser();
      } else {
        this.logout();
      }
    });
  }

  getUserDBRef(uid) {
    let user_uid = this.user.uid;
    if (uid) {
      user_uid = uid;
    }
    return FirebaseClient.firestore().collection("users").doc(user_uid);
  }
}
