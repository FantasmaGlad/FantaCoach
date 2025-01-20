// Importer les modules nécessaires de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set, push, get, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Configuration Firebase (vos clés)
const firebaseConfig = {
  apiKey: "AIzaSyAeNaxoX00eero9b7n-0_wiB4p8wAZ8Bog",
  authDomain: "fanta-coaching.firebaseapp.com",
  databaseURL: "https://fanta-coaching-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fanta-coaching",
  storageBucket: "fanta-coaching.firebasestorage.app",
  messagingSenderId: "742492742969",
  appId: "1:742492742969:web:67593bae5c7d304cd774e8",
  measurementId: "G-XNK1XXGT5K",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fonction : Ajouter une session
export function addSession(userId, session) {
  const sessionRef = ref(database, `users/${userId}/sessions`);
  const newSessionRef = push(sessionRef); // Ajouter une session unique
  set(newSessionRef, session)
    .then(() => {
      console.log("Session ajoutée avec succès !");
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de la session :", error);
    });
}

// Fonction : Obtenir les sessions d'un utilisateur
export function getSessions(userId, callback) {
  const sessionRef = ref(database, `users/${userId}/sessions`);
  onValue(sessionRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      console.log("Aucune session trouvée pour cet utilisateur.");
    }
  });
}

// Fonction : Ajouter un utilisateur
export function addUser(userId, userInfo) {
  const userRef = ref(database, `users/${userId}`);
  set(userRef, userInfo)
    .then(() => {
      console.log("Utilisateur ajouté avec succès !");
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    });
}

// Fonction : Obtenir les informations d'un utilisateur
export function getUser(userId, callback) {
  const userRef = ref(database, `users/${userId}`);
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        console.log("Aucun utilisateur trouvé.");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    });
}