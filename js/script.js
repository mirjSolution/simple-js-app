
// array of objects
let pokemonList = [
    { name: 'Bulbasur', height: 9, types: ['grass', 'poison']}, 
    { name: 'Charmeleon', height: 4, types: ['fire', 'water']}, 
    { name: 'Blastoise', height: 8, types: ['water', 'air']}, 
];

// loop to pokemonList array and display it on the browser
for (let i = 0; i < pokemonList.length; i++) {
    let pokemonListName = pokemonList[i].name
    let pokemonListHeight = pokemonList[i].height
    // condition to add wow that's big if height is greater than 7
    if(pokemonListHeight > 5) {
        document.write(pokemonListName + ' (height : ' + pokemonListHeight + ')' + ' - Wow, that\'s big!'); 
    } else {
        document.write(pokemonListName + ' (height : ' + pokemonListHeight + ')'); 
    }
  
  }