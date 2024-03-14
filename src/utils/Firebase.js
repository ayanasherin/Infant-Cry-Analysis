

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);