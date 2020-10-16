// IIFE
let pokemonRepository = (function () {
    // array of objects
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';

    // Function to add pokemon
    function add(pokemon) {
        pokemonList.push(pokemon)
    }

    // Function to get all pokemon on the array
    function getAll() {
        return pokemonList;
    }

    // Function to log the name of pokemon to console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
        
    }

    // Function to create button and display it on the screen
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        button.addEventListener('click', function() {
            showDetails(pokemon)
        })
        listPokemon.append(button);
        pokemonList.append(listPokemon);
    }

    // Function to load pokemon list using fetch
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

    // Function to load detailed data of Pokemon
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
  })();

  // Add pokemon on array
//   pokemonRepository.add({ name: 'Pikachu', height: 5, types:['electric', 'galvanic'] });

  // Loop to the array and display
  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });



