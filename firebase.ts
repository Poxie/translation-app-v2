// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALE1G-GHPlpIkxHRMYYfD1lUSlNPrtLOQ",
  authDomain: "translation-app-370614.firebaseapp.com",
  projectId: "translation-app-370614",
  storageBucket: "translation-app-370614.appspot.com",
  messagingSenderId: "57163834711",
  appId: "1:57163834711:web:a19943826f5578f5b94a12",
  measurementId: "G-89LNMLZ3LE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);