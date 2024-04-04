

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDXxXgit21FF_HVfrZfDWFkenHxypi9flk",
    authDomain: "cry-decode.firebaseapp.com",
    projectId: "cry-decode",
    storageBucket: "cry-decode.appspot.com",
    messagingSenderId: "520055854604",
    appId: "1:520055854604:web:cfa8251c63d123f16f0029",
    measurementId: "G-ZLDN7DYWW8"
  };

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const firestore = getFirestore(app);
 const storage = getStorage(app); // Initialize Firebase storage
export { app, auth, firestore, storage };