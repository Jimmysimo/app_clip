// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa52R4w9eFbtlJ5Yor0yRpuhck_9czE9s",
  authDomain: "appclip-6d1fa.firebaseapp.com",
  projectId: "appclip-6d1fa",
  storageBucket: "appclip-6d1fa.firebasestorage.app",
  messagingSenderId: "830649163436",
  appId: "1:830649163436:web:15c69e19d757c57a838909",
  measurementId: "G-NND3G32NQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);