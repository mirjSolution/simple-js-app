
// array of objects
let pokemonList = [
    { name: 'Bulbasur', height: 9, types: ['grass', 'poison']}, 
    { name: 'Charmeleon', height: 4, types: ['fire', 'water']}, 
    { name: 'Blastoise', height: 8, types: ['water', 'air']}, 
];

// Function to add pokemon
function add(pokemon) {
    pokemonList.push(pokemon)
}

// Function to view all pokemon on the array
function getAll() {
    return pokemonList;
}

// Function to log the name of pokemon to console
function showDetails(pokemon) {
    console.log(pokemon.target.outerText);
}

// Function to create button and display it on the screen
function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    button.addEventListener('click', showDetails)
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
}

// IIFE
let pokemonRepository = (function () {
   return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
    };
  })();

  // Add pokemon on array
  pokemonRepository.add({ name: 'Pikachu', height: 5, types:['electric', 'galvanic'] });

  // Loop to the array and display
  pokemonRepository.getAll().forEach(function (pokemon) {
     pokemonRepository.addListItem(pokemon);
  })



