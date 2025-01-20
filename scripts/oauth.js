// Configuration OAuth2
const CLIENT_ID = "VOTRE_CLIENT_ID";
const REDIRECT_URI = "https://fanta-coaching.netlify.app/utilisateur.html"; // ou coach.html si administrateur
const AUTH_URI = "https://accounts.google.com/o/oauth2/auth";

// URL pour l'authentification Google
const authUrl = `${AUTH_URI}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=openid%20email%20profile`;

// Lancer l'authentification
function startGoogleAuth() {
  window.location.href = authUrl;
}

// Gestion de la redirection après connexion
function getUserInfo(accessToken) {
  fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)
    .then(response => response.json())
    .then(data => {
      console.log("Données utilisateur :", data);

      // Rediriger vers coach.html si l'utilisateur est un administrateur
      if (data.email === "fantacoaching@gmail.com") {
        window.location.href = "https://fanta-coaching.netlify.app/coach.html";
      } else {
        window.location.href = "https://fanta-coaching.netlify.app/utilisateur.html";
      }
    })
    .catch(err => console.error("Erreur lors de la récupération des informations utilisateur :", err));
}

// Extraction du jeton depuis l'URL
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

document.addEventListener("DOMContentLoaded", extractAccessTokenFromUrl);