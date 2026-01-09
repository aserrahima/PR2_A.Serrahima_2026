//ENUNCIAT: /*Este script debe de gestionar el login de los usuarios.*/

/* Añadir las funciones que consideréis necesarias*/

    // Si hay un usuario logeado, redirigimos a la página indice de Pokemons
    //...

    // Si no hay un usuario logeado, comprobamos datos de login
    //...

    // Al pulsar el boton redirigimos a la página de registro
    //...


//EXERCICI: gestionar el login dels usuaris. 

function loadFromStorage(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.error("Error llegint LocalStorage:", e);
    return defaultValue;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error guardant a LocalStorage:", e);
  }
}

// Comprovació simple del login
function validateLogin(email, password) {
  if (typeof email !== "string" || email.trim() === "") return false;
  if (typeof password !== "string" || password.trim() === "") return false;
  return true;
}

// Busquem l'usuari al "users" guardat
function findUserByEmail(email) {
  const users = loadFromStorage("users", []);
  return users.find(u => (u.email || "").toLowerCase() === email.toLowerCase()) || null;
}

function setLoggedUser(user) {
  saveToStorage("currentUser", user);
}

function redirectToPokemonsIndex() {
  // Nota (CAT): canvia aquest nom si el teu fitxer és un altre
  window.location.href = "indice.html";
}

function redirectToRegister() {
  window.location.href = "register.html";
}

// Si hay un usuario logeado, redirigimos a la página indice de Pokemons
function checkAlreadyLogged() {
  const currentUser = loadFromStorage("currentUser", null);
  if (currentUser) {
    redirectToPokemonsIndex();
  }
}

// Si no hay un usuario logeado, comprobamos datos de login
function handleLoginSubmit(e) {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const passInput = document.getElementById("password");

  const email = emailInput ? emailInput.value : "";
  const password = passInput ? passInput.value : "";

  if (!validateLogin(email, password)) {
    alert("Omple email i contrasenya.");
    return;
  }

  const user = findUserByEmail(email);
  if (!user) {
    alert("Usuari no trobat. Registra't primer.");
    return;
  }

  // Guardem el password
  if (user.password !== password) {
    alert("Contrasenya incorrecta.");
    return;
  }

  setLoggedUser(user);
  redirectToPokemonsIndex();
}

// Al pulsar el boton redirigimos a la página de registro
function setupRegisterButton() {
  const btn = document.getElementById("goRegister");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      redirectToRegister();
    });
  }
}

function initLoginPage() {
  checkAlreadyLogged();

  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", handleLoginSubmit);
  }

  setupRegisterButton();
}

document.addEventListener("DOMContentLoaded", initLoginPage);

