// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA6eM-gQKx0jPCXuYz-R6jm0gCaYifcF0U",
  authDomain: "whatsapp-clone-13593.firebaseapp.com",
  projectId: "whatsapp-clone-13593",
  storageBucket: "whatsapp-clone-13593.appspot.com",
  messagingSenderId: "1065506808061",
  appId: "1:1065506808061:web:996cc328d11a5720c25e94",
  measurementId: "G-FFGS01JPPN",
};

// initailize firebase for Next.js
const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
