/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVDdcsN5w6lmn8K_Qyw4aggt7pwSu070c",
  authDomain: "doe-mais-8892d.firebaseapp.com",
  projectId: "doe-mais-8892d",
  storageBucket: "doe-mais-8892d.firebasestorage.app",
  messagingSenderId: "175852613799",
  appId: "1:175852613799:web:c86772c6ea9f492438ab82",
  measurementId: "G-S0SYBRVSV6"
};

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      const analytics = getAnalytics();
      console.log("Firebase Analytics iniciado.");
    } else {
      console.warn("Firebase Analytics não é suportado neste ambiente.");
    }
  });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export { initializeApp };
