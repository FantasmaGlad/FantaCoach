import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAeNaxoX00eero9b7n-0_wiB4p8wAZ8Bog",
  authDomain: "fanta-coaching.firebaseapp.com",
  databaseURL: "https://fanta-coaching-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fanta-coaching",
  storageBucket: "fanta-coaching.appspot.com",
  messagingSenderId: "742492742969",
  appId: "1:742492742969:web:67593bae5c7d304cd774e8",
  measurementId: "G-XNK1XXGT5K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure le fournisseur Google avec les domaines autorisés
googleProvider.setCustomParameters({
  prompt: 'select_account',
  // Ajoutez localhost pour le développement
  hd: window.location.hostname === 'localhost' ? 'localhost' : 'fanta-coaching.firebaseapp.com'
});

// En développement, utiliser l'émulateur d'authentification
if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export const db = getFirestore(app);
export const rtdb = getDatabase(app);