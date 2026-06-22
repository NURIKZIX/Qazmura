// src/app/stories/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  increment, 
  serverTimestamp 
} from "firebase/firestore";

// Сіздің жобаңыздың нақты Firebase конфигурациясы
const firebaseConfig = {
  apiKey: "AIzaSyAYTn7of45rZbeD4X6IlFr-Q-DHV_ZV2d0",
  authDomain: "qazmura-3091a.firebaseapp.com",
  projectId: "qazmura-3091a",
  storageBucket: "qazmura-3091a.firebasestorage.app",
  messagingSenderId: "329284352850",
  appId: "1:329284352850:web:b87e88260ce83836bad88b",
  measurementId: "G-8WE8F06JH3"
};

// Next.js (SSR) ортасында Firebase-ті қайта-қайта инициализацияламау үшін тексеру
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firestore дерекқорын іске қосу
export const db = getFirestore(app);

// Analytics жүйесін тек браузерде (клиентте) ғана іске қосу (SSR-ден қорғау)
export const analytics = typeof window !== "undefined" 
  ? isSupported().then(yes => yes ? getAnalytics(app) : null)
  : null;

// --- ИНТЕРФЕЙСТЕР ---
export interface StoryData {
  uid: string;
  title: string;
  content: string;
  type: string;
  mode: "classic" | "interactive";
  favorite: boolean;
}

// --- ФУНКЦИЯЛАР (XP ЖӘНЕ САКТАУ) ---

/**
 * Пайдаланушының XP ұпайларын Firestore дерекқорында жаңарту
 * @param uid Пайдаланушының бірегей ID-і
 * @param xpAmount Қосылатын ұпай саны (мысалы: +5, +10)
 */
export const updateUserXP = async (uid: string, xpAmount: number) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      xp: increment(xpAmount)
    });
    console.log(`[XP Жүйесі]: Пайдаланушыға +${xpAmount} XP сәтті қосылды.`);
  } catch (error) {
    console.error("XP ұпайын жаңарту кезінде қате шықты:", error);
  }
};

/**
 * Жасалған ертегіні Firestore 'stories' коллекциясына сақтау
 * @param story Ертегі деректері
 */
export const saveStoryToFirestore = async (story: StoryData) => {
  try {
    const docRef = await addDoc(collection(db, "stories"), {
      uid: story.uid,
      title: story.title,
      content: story.content,
      type: story.type,
      mode: story.mode,
      favorite: story.favorite,
      createdAt: serverTimestamp(), // Серверлік уақыт белгісі
    });

    console.log("[Firestore]: Ертегі ID-мен сақталды:", docRef.id);
    
    // Ертегіні сәтті сақтағаны үшін пайдаланушыға автоматты түрде +10 XP беру
    await updateUserXP(story.uid, 10);
    
    return docRef.id;
  } catch (error) {
    console.error("Ертегіні Firestore-ға сақтау сәтсіз аяқталды:", error);
    return null;
  }
};