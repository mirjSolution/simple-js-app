// IIFE
let pokemonRepository = (function () {

  // Hide loader
  document.getElementById('loading').style.display = 'none';

  // array of objects
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=14';

  // Function to add pokemon
  function add(pokemon) {
      pokemonList.push(pokemon)
  }

  // Function to get all pokemon on the array
  function getAll() {
      return pokemonList;
  }

  // Function to log details of pokemon to console
  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
          document.querySelector('.card-title').textContent = pokemon.name
          document.querySelector('.card-title').style.textTransform = 'capitalize';
          document.querySelector('.card-text').textContent = 'Height: ' + pokemon.height           
          document.querySelector('.list-group').classList.remove('d-none');
          let pokemonType = document.querySelector('.list-group');           
          pokemonType.innerHTML = ''   
          pokemonType.textContent = 'Types'
          document.querySelector('#modal-button').removeAttribute('disabled');
          pokemon.types.map(pokemon => {      
            let pokemonType = document.querySelector('.list-group');
            let pokemonTypeList = document.createElement('li');   
            pokemonTypeList.className = 'list-group-item';
            pokemonTypeList.textContent = pokemon.type.name;
            pokemonType.append(pokemonTypeList);
          })
          showModal(pokemon.imageUrl, pokemon.name);
      });
      
  }

  // Function to create button and display it on the screen
  function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listPokemon = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.className = 'btn btn-secondary btn-block m-1';
      // button.classList.add('pokemon-button');
      button.addEventListener('click', function() {
          showDetails(pokemon)    
      })
      listPokemon.className = 'pokemon-list-items'
      listPokemon.append(button);
      pokemonList.append(listPokemon);
  }

  // Function to load pokemon list using fetch
  function loadList() {
      // Show loader when fetching data
      document.getElementById('loading').style.display = 'block';
      document.querySelector('.card-pokemon-details').style.display = 'none';
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          // Hide loader after fetching data
          document.getElementById('loading').style.display = 'none';
          document.querySelector('.card-pokemon-details').style.display = 'block';
        });
      }).catch(function (e) {
        // Show loader when theres an error
        document.querySelector('#loading').style.display = 'block';
        document.querySelector('.card-pokemon-details').style.display = 'none';
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

  // Function show image on the modal
  function showModal(imageUrl, name) {
    let modalButton = document.querySelector('#modal-button');   
    modalButton.addEventListener('click', () => {
      let img = document.querySelector('.pokemon-image');
      img.src = imageUrl;    
    });
    document.querySelector('.modal-title').textContent = name
  }

  // Function to search pokemon 
  const search = document.querySelector('.search-pokemon');
  search.addEventListener('keyup', searchPokemon);

  function searchPokemon(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.pokemon-list-items').forEach(function(pokemon){
      const item = pokemon.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        pokemon.style.display = 'block';
      } else {
        pokemon.style.display = 'none';
      }
    });
  }

  return {
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
  };
})();

// Loop to the array and display
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});



