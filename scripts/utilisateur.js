// Gestion de la page utilisateur
import { getUserSessions } from './database.js';
import { extractAccessTokenFromUrl, getUserInfo } from './oauth.js';

document.addEventListener('DOMContentLoaded', () => {
    const token = extractAccessTokenFromUrl();
    if (token) {
        getUserInfo(token, (userInfo) => {
            console.log('Utilisateur connecté :', userInfo);

            // Affiche le nom de l'utilisateur
            const welcomeMessage = document.getElementById('welcome-message');
            welcomeMessage.textContent = `Bienvenue, ${userInfo.name}`;

            // Charge les sessions utilisateur
            getUserSessions(userInfo.email, (sessions) => {
                const sessionsList = document.getElementById('sessions-list');
                sessionsList.innerHTML = '';

                if (sessions && Object.keys(sessions).length > 0) {
                    for (const [date, session] of Object.entries(sessions)) {
                        const sessionItem = document.createElement('li');
                        sessionItem.textContent = `${date}: ${session}`;
                        sessionsList.appendChild(sessionItem);
                    }
                } else {
                    sessionsList.textContent = 'Aucune séance programmée pour l\'instant.';
                }
            });
        });
    } else {
        console.error('Aucun token trouvé, redirection vers la page de connexion.');
        window.location.href = 'index.html';
    }
});