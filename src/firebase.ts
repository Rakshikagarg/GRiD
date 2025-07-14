import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAtmaNtwOS3nvVlDoa0Y_TAU6X4Yp9tE4s",
  authDomain: "grid-cff05.firebaseapp.com",
  projectId: "grid-cff05",
  storageBucket: "grid-cff05.firebasestorage.app",
  messagingSenderId: "313368401929",
  appId: "1:313368401929:web:ea3c6c54680bd0620880d8",
  measurementId: "G-MHEHP3FGYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth and Firestore
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
