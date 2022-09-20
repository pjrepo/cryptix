import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFireStore } from "firebase/firestore";
import FirebaseConfig from "./utils/FirebaseConfig";

const firebaseApp = initializeApp(FirebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFireStore(firebaseApp);

export { auth, db };
