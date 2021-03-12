import firebase from "firebase/app";

const configureFirebase = async () => {
  if (process.env.NODE_ENV === "production") {
    await fetch("/__/firebase/init.json").then(async (response) => {
      firebase.initializeApp(await response.json());
    });
  }
};

export default configureFirebase;
