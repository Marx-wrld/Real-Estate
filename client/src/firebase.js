// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kana-estate.firebaseapp.com",
  projectId: "kana-estate",
  storageBucket: "kana-estate.appspot.com",
  messagingSenderId: "889102243529",
  appId: "1:889102243529:web:fde49d4d75211a63915f18",
  measurementId: "G-YYEH0XYB0L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);