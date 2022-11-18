

function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon">
        <span class="number">#001</span>
        <span class="name"> ${pokemon.name}</span>

        <div>
            <ol>
                <li class="type">grass</li>
                <li class="type">poison</li>
            </ol>
            <img src="">
        </div>
    </li>
    `
}

const pokemonList = console.log(document.getElementById("pokemonList"));
pokemonList.innerHTML += '<li>Teste</li>'

fetch(url) //consome a api
    
pokeApi.getPokemons().then((pokemons) => {
    const listItems = []

    pokemons.map()

    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        listItems.push(convertPokemonToLi(pokemon))
    }

    console.log(listItems)
})

