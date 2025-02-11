import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Remove initializeAuth and persistence
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAKo0VKD3wWjBWriKenDZLCcUVMCQ3kJi4",
  authDomain: "aicourseapp-9bffa.firebaseapp.com",
  projectId: "aicourseapp-9bffa",
  storageBucket: "aicourseapp-9bffa.firebasestorage.app",
  messagingSenderId: "327788694073",
  appId: "1:327788694073:web:6456c2b8e9445bc6771be8",
  measurementId: "G-4050B21RWD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // No more persistence
export const db = getFirestore(app);
