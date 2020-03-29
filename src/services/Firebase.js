import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';



const firebaseConfig = {
    apiKey: process.env.REACT_APP_CORONA_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_CORONA_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_CORONA_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_CORONA_FIREBASE_PROJECT_ID,
    storageBucket:  process.env.REACT_APP_CORONA_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_CORONA_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_CORONA_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_CORONA_FIREBASE_MEASURMENT_ID
};


firebase.initializeApp(firebaseConfig);
const FirebaseClient = firebase;

export default FirebaseClient;
