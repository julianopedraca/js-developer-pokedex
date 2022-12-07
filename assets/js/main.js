const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const overlay = document.getElementById("overlay");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
<li class="pokemon ${pokemon.type}" onclick="openModal('${pokemon.name}')">
  <span class="number">#${pokemon.number}</span>
  <span class="name">${pokemon.name}</span>
  <div class="detail">
    <ol class="types">
      ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`) .join("")}
    </ol>
    <img src="${pokemon.photo}" alt="${pokemon.name}" />
  </div>
</li>

<div class="modal hidden ${pokemon.type}" id="${pokemon.name}Modal">
  <span class="number">#${pokemon.number}</span>
  <span class="name">${pokemon.name}</span>
  <img class="photo" src="${pokemon.photo}" alt="${pokemon.name}" />
  <table>
    <tr>
      <th scope="row">Species</th>
      <td>${pokemon.species}</td>
    </tr>
    <tr>
      <th scope="row">Height</th>
      <td>${pokemon.height}</td>
    </tr>
    <tr>
      <th scope="row">Weight</th>
      <td>${pokemon.weight/10} Kg</td>
    </tr>
    <tr>
      <th scope="row">Abilities</th>
      <td>
        <ol class="abilities">
          ${pokemon.abilities.map((abilite) => `<li class="abilite ${abilite}">${abilite}</li>`).join("")}
        </ol>
      </td>
    </tr>

    <tr>
      <th scope="row">Gender Ratio</th>
      <td>${pokemon.maleGender}</td>
      <th scope="row"> female Ratio </th>
      <td>${pokemon.femaleGender}</td>
    </tr>
  </table>
</div>
    `;
}


function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}



// Open Modal
function openModal(pokemon) {
  const pokeModal = document.getElementById(pokemon + "Modal");
  pokeModal.classList.remove("hidden");
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("hidden");
}

loadPokemonItens(offset, limit);



loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

// close modal function
function closeModal() {
  const modal = document.querySelectorAll(".modal");
  const overlay = document.getElementById("overlay");
  for (const popModal of modal) {
    if (popModal.classList.contains("hidden") === false) {
      popModal.classList.add("hidden");
    }
  }
  overlay.classList.add("hidden");
}

// close the modal when the close button and overlay is clicked
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});