import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0hdRxmXsCUkX_q9etTWa-MV77tjeMTLs",
  authDomain: "todo-5ab00.firebaseapp.com",
  projectId: "todo-5ab00",
  storageBucket: "todo-5ab00.appspot.com",
  messagingSenderId: "1052227958540",
  appId: "1:1052227958540:web:e5759b4ac88d46554cbb29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()

export default app;
