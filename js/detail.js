//"ENUNCIAT": 
/*Este script carga la información del Pokemon seleccionado y la muestra en la página de detalles.*/
/* Añadir las funciones que consideréis necesarias*/


//Exercici: Carregar la info del Pokemon seleccionat i mostrar-la en la pàgina de detalls

//funcions afegides:
// Si no existeix la clau, retornem un valor per defecte. Llegeix del LocalStorage.
function loadFromStorage(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.error("Error llegint LocalStorage:", e);
    return defaultValue;
  }
}

// Agafar paràmetres de la URL
function getQueryParam(paramName) {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
}

// Trobar el Pokémon per id dins els pokémons guardats
function getPokemonById(id) {
  const pokemons = loadFromStorage("pokemons", []);
  return pokemons.find(p => Number(p.id) === Number(id)) || null;
}

// Usuari logejat
function getCurrentUser() {
  return loadFromStorage("currentUser", null);
}

function saveCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// Assegurem que existeixin les llistes
function ensureUserLists(user) {
  if (!user.lists) user.lists = {};
  if (!Array.isArray(user.lists.myTeam)) user.lists.myTeam = [];
  if (!Array.isArray(user.lists.wishes)) user.lists.wishes = [];
  return user;
}

// Afegim a "myTeam" o "wishes"
function addPokemonToList(listType, pokemonId) {
  let user = getCurrentUser();
  if (!user) {
    alert("Has d'iniciar sessió per afegir pokémons.");
    return;
  }

  user = ensureUserLists(user);

  const idNum = Number(pokemonId);
  if (!user.lists[listType].includes(idNum)) {
    user.lists[listType].push(idNum);
    saveCurrentUser(user);
    alert("Afegit correctament!");
  } else {
    alert("Aquest Pokémon ja hi és.");
  }

  // Al tenir menu.js carregat, actualitzem comptadors
  if (typeof updateMenu === "function") updateMenu();
}


//Tipus "render" per pintar a la pantalla
// Posem les dades del Pokémon dins del HTML. 


function renderPokemonDetail(pokemon) {
  // Eliminem el "Cargando..." (buidant el contenidor)
  const container = document.getElementById("pokemonDetail");
  if (container) container.querySelector("p")?.remove();

  document.getElementById("title").textContent = pokemon.name;
  document.getElementById("img").src = pokemon.sprites;
  document.getElementById("img").alt = pokemon.name;

  document.getElementById("desc").textContent = pokemon.description || "Descripció no disponible";

  // Meta (tipus, height, weight, exp...)
  const metaUl = document.getElementById("meta");
  metaUl.innerHTML = "";

  const metaItems = [
    `Tipus: ${(pokemon.types || []).join(", ")}`,
    `Alçada: ${pokemon.height}`,
    `Pes: ${pokemon.weight}`,
    `Experiència base: ${pokemon.baseExperience}`
  ];

  metaItems.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    metaUl.appendChild(li);
  });

  // Stats
  const statsUl = document.getElementById("stats");
  statsUl.innerHTML = "";

  (pokemon.stats || []).forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name}: ${s.value}`;
    statsUl.appendChild(li);
  });

  // Botons
  document.getElementById("btnTeam").addEventListener("click", () => {
    addPokemonToList("myTeam", pokemon.id);
  });

  document.getElementById("btnWish").addEventListener("click", () => {
    addPokemonToList("wishes", pokemon.id);
  });
}

function initDetailPage() {
  const id = getPokemonIdFromUrl();
  if (!id) {
    console.error("Falta l'id a la URL. Exemple: detail.html?id=25");
    return;
  }

  const pokemon = getPokemonById(id);
  if (!pokemon) {
    console.error("No s'ha trobat el Pokémon amb id:", id);
    return;
  }

  renderPokemonDetail(pokemon);

  // Botó tornar (els dos existeixen al teu HTML, però usem el visible)
  const backButton = document.getElementById("backButton");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "indice.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", initDetailPage);
