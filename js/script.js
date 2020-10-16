// IIFE
let pokemonRepository = (function () {
    // array of objects
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10?w=500&h=500';

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
            showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
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

    // Function show modal
    function showModal(title, text, imageUrl) {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.add('is-visible');

      // Clear all existing modal content
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Add the new modal content
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;

      let contentElement = document.createElement('p');
      contentElement.innerText = 'Height: ' + text;

      let img = document.createElement('img');
      img.src = imageUrl;
      img.alt = 'Pokemon Image'
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(img)
      modal.appendChild(closeButtonElement);
      modalContainer.appendChild(modal);
      modalContainer.classList.add('is-visible');
    }

    // Function hide modal
    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    } 
    
    
    let modalContainer = document.querySelector('#modal-container');
    // Window event listener when key esc press it will close the modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
    };
  })();

  // Loop to the array and display
  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });



