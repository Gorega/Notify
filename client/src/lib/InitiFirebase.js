import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyDZYsiiViTZ8RDg7tZGS_v90wb3qhewViQ",
    authDomain: "notify-6daca.firebaseapp.com",
    projectId: "notify-6daca",
    storageBucket: "notify-6daca.appspot.com",
    messagingSenderId: "398730267366",
    appId: "1:398730267366:web:4be4477c09378537278927"
  };

export const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);