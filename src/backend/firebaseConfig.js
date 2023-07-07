import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJ6MP3dd8yGFv5FwxDBF4aQgw0gbJ_0lY",
  authDomain: "linkforest-helloyash.firebaseapp.com",
  projectId: "linkforest-helloyash",
  storageBucket: "linkforest-helloyash.appspot.com",
  messagingSenderId: "444648063384",
  appId: "1:444648063384:web:81046d6aab8dd057baabed"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
