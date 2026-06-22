// lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase конфигурациясы
const firebaseConfig = {
  apiKey: "AIzaSyAYTn7of45rZbeD4X6IlFr-Q-DHV_ZV2d0",
  authDomain: "qazmura-3091a.firebaseapp.com",
  projectId: "qazmura-3091a",
  storageBucket: "qazmura-3091a.firebasestorage.app",
  messagingSenderId: "329284352850",
  appId: "1:329284352850:web:b87e88260ce83836bad88b",
  measurementId: "G-8WE8F06JH3",
};

// Firebase-ті тек бір рет іске қосу
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

// Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

// Firebase App
export default app;