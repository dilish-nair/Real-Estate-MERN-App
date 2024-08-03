// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f166c.firebaseapp.com",
  projectId: "mern-estate-f166c",
  storageBucket: "mern-estate-f166c.appspot.com",
  messagingSenderId: "73037317573",
  appId: "1:73037317573:web:81cd09208c0cdcaf0277ac"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);