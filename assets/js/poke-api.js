const pokeApi = {};
let pokeGender = [];

async function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  pokemon.species = await getPokemonsSpecies(pokeDetail.species.url, "genus");
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;

  const abilities = pokeDetail.abilities.map(
    (abilitySlot) => abilitySlot.ability.name
  );

  //TODO optimize getPokemons to execute only once
  await getPokemonsGenderRatio();

  pokemon.maleGender = pokeGender
    .map((pokemon) => {
      if (pokemon.pokemon_id === pokeDetail.id) {
        return pokemon.gender.male_percent;
      }
    })
    .filter((el) => el != undefined);

  pokemon.femaleGender = pokeGender
    .map((pokemon) => {
      if (pokemon.pokemon_id === pokeDetail.id) {
        return pokemon.gender.female_percent;
      }
    })
    .filter((el) => el != undefined);

  pokeGender = [];

  pokemon.abilities = abilities;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

function getPokemonsSpecies(url, variavel) {
  return fetch(url)
    .then((response) => response.json())
    .then((species) => species.genera[7])
    .then((speciesGenus) => speciesGenus[variavel]);
}

function getPokemonsGenderRatio() {
  const url = "https://pogoapi.net/api/v1/pokemon_genders.json";
  return fetch(url)
    .then((response) => response.json())
    .then((pokemonsData) => {
      for (const obj in pokemonsData) {
        for (const dados of pokemonsData[obj]) {
          if (dados.form === "Normal" || dados.form === undefined) {
            pokeGender.push(dados);
          }
        }
      }
    });
}
