// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_Xb1rarkzbTCSGc-lWOsnGzYS3sYR3JA",
  authDomain: "hackathon-12c4d.firebaseapp.com",
  projectId: "hackathon-12c4d",
  storageBucket: "hackathon-12c4d.firebasestorage.app",
  messagingSenderId: "792208404570",
  appId: "1:792208404570:web:418ac2b7fc210bf5e36863",
  measurementId: "G-ZTNL00EWD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireStore = getFirestore(app);

export { analytics, auth, fireStore };