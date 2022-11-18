

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
    
pokeApi.getPokemons().then((pokemons = []) => {
    const listItems = []

    const newlist = pokemons.map((pokemon) => {
        return convertPokemonToLi(pokemon)
    })

    pokemonList.innerHTML += newlist

})

