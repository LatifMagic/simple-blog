import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjbrDsM9b9yjjSQSsfpOdbYzpO7Hg0Mfo",
  authDomain: "react-blog-fe376.firebaseapp.com",
  projectId: "react-blog-fe376",
  storageBucket: "react-blog-fe376.appspot.com",
  messagingSenderId: "873674498793",
  appId: "1:873674498793:web:04f7836067d4d712f74678",
  measurementId: "G-QSSLW8Z0E1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
