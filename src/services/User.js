import FirebaseClient from "./Firebase";

export class UserClient {
  constructor(updater) {
    this.user = null;
    this.updateUser = () => {
      updater(this.user);
    };

    this.login = this.login.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.init();
  }

  async login(email, password) {
    const response = await FirebaseClient.auth().signInWithEmailAndPassword(email, password);
    if (response.user) {
      this.user = response.user;
      return response;
    } else {
      throw new Error("No user in response");
    }
  }

  async googleLogin() {
    const provider = new FirebaseClient.auth.GoogleAuthProvider();
    provider.addScope("email");
    provider.addScope("profile");
    provider.setCustomParameters({ prompt: "select_account" });

    const response = await FirebaseClient.auth().signInWithPopup(provider);
    if (response.user) {
      this.user = response.user;
    } else {
      throw new Error("No user in response");
    }
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

  async register(email, password) {
    await FirebaseClient.auth().createUserWithEmailAndPassword(email, password);
    return await this.login(email, password);
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
        this.updateUser();
      } else {
        this.logout();
      }
    });

    FirebaseClient.auth().onIdTokenChanged(async (user) => {
      if (user) {
        this.user = user;
        this.updateUser();
      } else {
        this.logout();
      }
    });
  }
}
