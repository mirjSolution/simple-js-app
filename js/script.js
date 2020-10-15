
// array of objects
let pokemonList = [
    { name: 'Bulbasur', height: 9, types: ['grass', 'poison']}, 
    { name: 'Charmeleon', height: 4, types: ['fire', 'water']}, 
    { name: 'Blastoise', height: 8, types: ['water', 'air']}, 
];

// IIFE pokemonRepository
let pokemonRepository = (function () {
   return {
      add: function(pokemon) {
        pokemonList.push(pokemon);
      },
      getAll: function() {
        return pokemonList;
      }
    };
  })();

  pokemonRepository.add({ name: 'Pikachu', height: 5, types:['electric', 'galvanic'] });
  console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]

  // IIFE function with loop to pokemonList array and display it on the browser
(function () {
    pokemonList.forEach(function(pokemon) {
        let pokemonName = pokemon.name
        let pokemonHeight = pokemon.height
        // condition to add wow that's big if height is greater than 7
        if(pokemonHeight > 5) {
            document.write(pokemonName + ' (height : ' + pokemonHeight + ')' + ' - Wow, that\'s big!'); 
        } else {
            document.write(pokemonName + ' (height : ' + pokemonHeight + ')'); 
        }
            document.write('<br>', '<br>');
        });
})();