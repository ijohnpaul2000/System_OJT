import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5NRVxGbTAh4wgAcZITThILHcsglrk5YQ",
  authDomain: "db-research-sys.firebaseapp.com",
  projectId: "db-research-sys",
  storageBucket: "db-research-sys.appspot.com",
  messagingSenderId: "451938751023",
  appId: "web:e97c591de90b559c67ecda",
  measurementId: "G-BMCFT3SMPL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);
