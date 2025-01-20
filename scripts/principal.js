// Charger les utilisateurs depuis localStorage
function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    return users;
  }
  
  // Afficher les utilisateurs connectés dans l'espace administrateur
  function displayUsers() {
    const userListElement = document.getElementById("user-list");
    if (!userListElement) return;
  
    const users = loadUsers();
    const userListHTML = Object.keys(users)
      .map(email => `<li>${email}</li>`)
      .join("");
    userListElement.innerHTML = userListHTML;
  }
  
  // Ajouter une séance à un utilisateur spécifique
  function addSessionToUser(email, session) {
    const users = loadUsers();
    if (users[email]) {
      if (!users[email].sessions) {
        users[email].sessions = [];
      }
      users[email].sessions.push(session);
      localStorage.setItem("users", JSON.stringify(users));
      alert(`Séance ajoutée pour ${email}`);
    } else {
      alert("Utilisateur non trouvé.");
    }
  }
  
  // Gestionnaire de formulaire pour créer une séance
  function handleSessionFormSubmit(event) {
    event.preventDefault();
    const sessionName = document.getElementById("session-name").value;
    const sessionDate = document.getElementById("session-date").value;
  
    if (!sessionName || !sessionDate) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
  
    const session = {
      name: sessionName,
      date: sessionDate,
    };
  
    const email = prompt("Entrez l'email de l'utilisateur pour ajouter cette séance :");
    if (email) {
      addSessionToUser(email, session);
    }
  }
  
  // Initialisation
  document.addEventListener("DOMContentLoaded", () => {
    displayUsers();
  
    const sessionForm = document.getElementById("create-session-form");
    if (sessionForm) {
      sessionForm.addEventListener("submit", handleSessionFormSubmit);
    }
  });  