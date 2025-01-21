// Importation des fonctions nécessaires depuis Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

// Configuration Firebase
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

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Ajouter une nouvelle séance dans la base de données
 * @param {string} userId - L'identifiant de l'utilisateur
 * @param {string} sessionName - Le nom de la séance
 * @param {string} sessionDate - La date de la séance
 */
export function addSession(userId, sessionName, sessionDate) {
  const userSessionsRef = ref(database, `users/${userId}/sessions`);
  const newSessionRef = push(userSessionsRef);
  set(newSessionRef, {
    name: sessionName,
    date: sessionDate
  }).then(() => {
    console.log("Séance ajoutée avec succès.");
  }).catch((error) => {
    console.error("Erreur lors de l'ajout de la séance:", error);
  });
}

/**
 * Récupérer les séances d'un utilisateur
 * @param {string} userId - L'identifiant de l'utilisateur
 * @param {function} callback - Fonction de rappel pour traiter les données récupérées
 */
export function getUserSessions(userId, callback) {
  const userSessionsRef = ref(database, `users/${userId}/sessions`);
  onValue(userSessionsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  }, (error) => {
    console.error("Erreur lors de la récupération des séances:", error);
  });
}

/**
 * Récupérer la liste des utilisateurs connectés
 * @param {function} callback - Fonction de rappel pour traiter les données récupérées
 */
export function getConnectedUsers(callback) {
  const usersRef = ref(database, 'users');
  onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  }, (error) => {
    console.error("Erreur lors de la récupération des utilisateurs connectés:", error);
  });
}