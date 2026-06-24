// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDYraQwLF69JHgxrF2FSZwAVbMO5xwKPf4",
  authDomain: "attendance-system-95342.firebaseapp.com",
  projectId: "attendance-system-95342",
  storageBucket: "attendance-system-95342.firebasestorage.app",
  messagingSenderId: "653686235915",
  appId: "1:653686235915:web:18ab90ea276c1c4691f80e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);


export { db, collection, addDoc };