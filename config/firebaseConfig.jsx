import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native"; // Import Platform for detection

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

// Conditionally initialize Auth for React Native & Web
export const auth =
  Platform.OS === "web"
    ? getAuth(app) // Default auth for Web
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });

export const db = getFirestore(app);
