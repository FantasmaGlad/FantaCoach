// Configuration OAuth2
const CLIENT_ID = "1005485884986-1qsda51gbqj9rt9qda5vpcol5f3rq12m.apps.googleusercontent.com";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_URI = "https://accounts.google.com/o/oauth2/auth";

// URL pour l'authentification Google
const authUrl = `${AUTH_URI}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=openid%20email%20profile`;

// Lancer l'authentification
function startGoogleAuth() {
  window.location.href = authUrl;
}

// Ajouter l'événement au bouton de connexion
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".btn-connect");
  if (loginButton) {
    loginButton.addEventListener("click", startGoogleAuth);
  }
});

// Récupérer les informations utilisateur après connexion
function getUserInfo(accessToken) {
  fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)
    .then(response => response.json())
    .then(data => {
      console.log("Données utilisateur :", data);

      // Vérifier si l'utilisateur est un administrateur
      if (data.email === "fantacoaching@gmail.com") {
        window.location.href = "coach.html";
      } else {
        // Redirection vers la page utilisateur
        localStorage.setItem("currentUser", JSON.stringify(data));
        window.location.href = "utilisateur.html";
      }
    })
    .catch(err => console.error("Erreur lors de la récupération des informations utilisateur :", err));
}

// Extraire le jeton d'accès depuis l'URL
function extractAccessTokenFromUrl() {
  const hash = window.location.hash;
  if (hash) {
    const token = new URLSearchParams(hash.substring(1)).get("access_token");
    if (token) {
      getUserInfo(token);
    } else {
      console.error("Jeton d'accès non trouvé.");
    }
  }
}

// Initialiser l'extraction du jeton
document.addEventListener("DOMContentLoaded", extractAccessTokenFromUrl);