// Configuration OAuth2
const CLIENT_ID = "VOTRE_CLIENT_ID"; // Remplacez par votre client ID OAuth2
const REDIRECT_URI = "https://fanta-coaching.netlify.app/utilisateur.html"; // URL de redirection utilisateur par défaut
const AUTH_URI = "https://accounts.google.com/o/oauth2/auth";
const TOKEN_URI = "https://oauth2.googleapis.com/token";

// URL pour l'authentification Google
const authUrl = `${AUTH_URI}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=openid%20email%20profile`;

// Lancer l'authentification Google
export function startGoogleAuth() {
  window.location.href = authUrl;
}

// Fonction pour récupérer les informations utilisateur après la connexion
export function getUserInfo(accessToken, callback) {
  fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Données utilisateur :", data);

      // Vérifier si l'utilisateur est administrateur
      if (data.email === "fantacoaching@gmail.com") {
        // Rediriger vers coach.html si administrateur
        window.location.href = "https://fanta-coaching.netlify.app/coach.html";
      } else {
        // Si utilisateur normal, appeler le callback
        callback(data);
      }
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des informations utilisateur :", err);
    });
}

// Fonction pour extraire le jeton d'accès depuis l'URL
export function extractAccessTokenFromUrl() {
  const hash = window.location.hash;
  if (hash) {
    const token = new URLSearchParams(hash.substring(1)).get("access_token");
    if (token) {
      console.log("Jeton d'accès récupéré :", token);
      return token;
    } else {
      console.error("Jeton d'accès non trouvé.");
    }
  }
  return null;
}

// Gestion de la redirection après connexion
document.addEventListener("DOMContentLoaded", () => {
  const token = extractAccessTokenFromUrl();
  if (token) {
    getUserInfo(token, (userInfo) => {
      console.log("Utilisateur connecté :", userInfo);
      // Vous pouvez sauvegarder les informations utilisateur dans Firebase ici
    });
  }
});

// Fonction pour poster une séance dans Firebase
export function postSession(sessionName, sessionDate) {
  const databaseUrl = "https://fanta-coaching-default-rtdb.europe-west1.firebasedatabase.app";
  const sessionData = {
    name: sessionName,
    date: sessionDate,
    created_at: new Date().toISOString(),
  };

  fetch(`${databaseUrl}/sessions.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sessionData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Séance postée avec succès :", data);
      alert("Séance créée avec succès !");
    })
    .catch((err) => {
      console.error("Erreur lors de la création de la séance :", err);
    });
}