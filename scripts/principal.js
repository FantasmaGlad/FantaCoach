// Import des modules Firebase et OAuth2
import { addSession, getSessions, addUser, getUser } from "./database.js";
import { startGoogleAuth, extractAccessTokenFromUrl, getUserInfo } from "./oauth.js";

// Initialiser la logique principale après chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button"); // Bouton de connexion
  const addSessionButton = document.getElementById("add-session-button"); // Bouton pour ajouter une session
  const sessionList = document.getElementById("session-list"); // Liste des sessions

  // Déclenche l'authentification Google
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      startGoogleAuth();
    });
  }

  // Vérifier si un jeton d'accès est présent dans l'URL
  const token = extractAccessTokenFromUrl();
  if (token) {
    // Récupérer les informations utilisateur
    getUserInfo(token, (userInfo) => {
      console.log("Utilisateur connecté :", userInfo);

      // Ajouter l'utilisateur à Firebase
      addUser(userInfo.id, {
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
      });

      // Afficher le nom de l'utilisateur connecté
      const welcomeMessage = document.getElementById("welcome-message");
      if (welcomeMessage) {
        welcomeMessage.textContent = `Bienvenue, ${userInfo.name}`;
      }

      // Charger les sessions de l'utilisateur
      loadUserSessions(userInfo.id);
    });
  }

  // Ajouter une nouvelle session
  if (addSessionButton) {
    addSessionButton.addEventListener("click", () => {
      const userId = "user123"; // Remplacez par l'ID utilisateur récupéré dynamiquement
      const session = {
        date: document.getElementById("session-date").value,
        type: document.getElementById("session-type").value,
      };

      addSession(userId, session);
    });
  }

  // Charger les sessions utilisateur
  function loadUserSessions(userId) {
    getSessions(userId, (sessions) => {
      sessionList.innerHTML = ""; // Réinitialiser la liste

      for (const sessionId in sessions) {
        const session = sessions[sessionId];
        const listItem = document.createElement("li");
        listItem.textContent = `${session.date} - ${session.type}`;
        sessionList.appendChild(listItem);
      }
    });
  }
});