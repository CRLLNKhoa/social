    // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs7f0rzyPgB5bKUtxCogjTq329z0kIm0c",
  authDomain: "social-99176.firebaseapp.com",
  projectId: "social-99176",
  storageBucket: "social-99176.appspot.com",
  messagingSenderId: "630779435960",
  appId: "1:630779435960:web:9f2baa7aabfd11d0f80d4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);