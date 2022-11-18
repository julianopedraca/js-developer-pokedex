
const pokeApi = {} //criando objeto

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.com/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    fetch(url) //consome a api
        .then((response) => response.json()) //transforma a response do bodey em json
        .then((jsonBody) => jsonBody.results)
        .catch((error) => console.error(error))
}