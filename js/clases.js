//PR1


    /* Constructor de la clase User */
    /* Getters y Setters */ 

// PAS 1:
// 1. Creación de la clase Pokemon, que representa a un objeto Pokemon
class Pokemon {
  constructor({
    id,
    name,
    description,
    height,
    weight,
    baseExperience,
    abilities = [],
    types,
    sprites,
    stats
  }) {
    // Usamos setters para permitir validaciones
    this.id = id;
    this.name = name;
    this.description = description;
    this.height = height;
    this.weight = weight;
    this.baseExperience = baseExperience;
    this.abilities = abilities;
    this.types = types;
    this.sprites = sprites;
    this.stats = stats;
  }

  // Getters 
  get id() { return this._id; }
  get name() { return this._name; }
  get description() { return this._description; }
  get height() { return this._height; }
  get weight() { return this._weight; }
  get baseExperience() { return this._baseExperience; }
  get abilities() { return this._abilities; }
  get types() { return this._types; }
  get sprites() { return this._sprites; }
  get stats() { return this._stats; }

  // Setters (amb validació senzilla) 
  set id(newId) {
    if (!Number.isInteger(newId) || newId <= 0) {
      throw new Error("id debe ser un entero positivo.");
    }
    this._id = newId;
  }

  set name(newName) {
    if (typeof newName !== "string" || newName.trim().length === 0) {
      throw new Error("name debe ser un string no vacío.");
    }
    this._name = newName.trim();
  }

  set description(newDescription) {
    if (typeof newDescription !== "string") {
      throw new Error("description debe ser un string.");
    }
    this._description = newDescription;
  }

  set height(newHeight) {
    if (typeof newHeight !== "number" || Number.isNaN(newHeight) || newHeight < 0) {
      throw new Error("height debe ser un número >= 0.");
    }
    this._height = newHeight;
  }

  set weight(newWeight) {
    if (typeof newWeight !== "number" || Number.isNaN(newWeight) || newWeight < 0) {
      throw new Error("weight debe ser un número >= 0.");
    }
    this._weight = newWeight;
  }

  set baseExperience(newExp) {
    if (typeof newExp !== "number" || Number.isNaN(newExp) || newExp < 0) {
      throw new Error("baseExperience debe ser un número >= 0.");
    }
    this._baseExperience = newExp;
  }

  set abilities(newAbilities) {
    if (!Array.isArray(newAbilities)) {
      throw new Error("abilities debe ser un array.");
    }
    this._abilities = newAbilities;
  }

  set types(newTypes) {
    if (!Array.isArray(newTypes) || newTypes.length === 0) {
      throw new Error("types debe ser un array no vacío.");
    }
    // validación simple: que sean strings
    if (!newTypes.every(t => typeof t === "string" && t.trim().length > 0)) {
      throw new Error("types debe contener solo strings no vacíos.");
    }
    this._types = newTypes.map(t => t.trim());
  }

  set sprites(newSprites) {
    if (typeof newSprites !== "string" || newSprites.trim().length === 0) {
      throw new Error("sprites debe ser un string no vacío (URL).");
    }
    this._sprites = newSprites.trim();
  }

  set stats(newStats) {
    if (!Array.isArray(newStats)) {
      throw new Error("stats debe ser un array.");
    }
    // validació simple: objetes amb { name: string, value: number }
    const ok = newStats.every(s =>
      s &&
      typeof s === "object" &&
      typeof s.name === "string" &&
      s.name.trim().length > 0 &&
      typeof s.value === "number" &&
      !Number.isNaN(s.value)
    );
    if (!ok) {
      throw new Error('stats debe ser un array de objetos { name: string, value: number }.');
    }
    this._stats = newStats.map(s => ({ name: s.name.trim(), value: s.value }));
  }
}

//PAS 2:
// 2. Creación de la clase PokemonList
class PokemonList {
  constructor() {
    this._pokemons = []; // Array per anar guardant els Pokemons
  }

  // Añadir un Pokémon a la lista
  addPokemon(pokemon) {
    if (pokemon instanceof Pokemon) {
      this._pokemons.push(pokemon);
    } else {
      console.error("Només es poden afegir objectes de la classe Pokemon.");
    }
  }

  // Eliminar un Pokémon de la lista por ID
  removePokemon(pokemonId) {
    const index = this._pokemons.findIndex(poke => poke.id === pokemonId);
    if (index !== -1) {
      this._pokemons.splice(index, 1);
      console.log(`Pokemon amb ID ${pokemonId} eliminat correctament.`);
    } else {
      console.log(`No s'ha trobat cap pokemon amb ID ${pokemonId}.`);
    }
  }

  // Mostrar la lista de Pokémon (nombre, tipo principal e imagen)
  showList() {
    console.log("Llista de Pokemons:");
    for (let i = 0; i < this._pokemons.length; i++) {
      let pokemon = this._pokemons[i];
      console.log(" Nom:" + pokemon.name + " Tipus:" + pokemon.types[0] + " Imatge:" + pokemon.sprites);
    }
  }
