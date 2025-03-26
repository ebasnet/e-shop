// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFSnysWYnqXB2rSbE0AHJ8oUYbfFH6TYA",
  authDomain: "e-shop-fb230.firebaseapp.com",
  projectId: "e-shop-fb230",
  storageBucket: "e-shop-fb230.firebasestorage.app",
  messagingSenderId: "10857365234",
  appId: "1:10857365234:web:2659f7f10544f2eeb3da6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
