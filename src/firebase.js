import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// Replace with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyArljRgq8ENtWI5OJU7htxjisAyrovenos",
  authDomain: "jamb-cbt-adc5f.firebaseapp.com",
  projectId: "jamb-cbt-adc5f",
  storageBucket: "jamb-cbt-adc5f.firebasestorage.app",
  messagingSenderId: "146796094456",
  appId: "1:146796094456:web:5bdab5b496121c6be96c0d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
