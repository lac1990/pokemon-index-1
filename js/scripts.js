 //IIFE 
let pokemonRepository = (function() {
  let repository = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let $modalContainer = document.querySelector('#modal-container');

  //add pokemon item to a list
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("pokemon NOT correct");
    }
  }
  //return an array of pokemons
  function getAll() {
    return repository;
  }
//create pokemon buttons list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('my-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    //adding an event listener to the button - creating it was enough, no need to querySelector it
    button.addEventListener('click', function(event) {
      //calling showDetails as the event handler function
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    // Clear all existing modal content
    $modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', pokemon.imageUrl);

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + pokemon.weight;

    let typesElement = document.createElement('p');
    typesElement.innerText = 'Type: ' + pokemon.types.join(', ');

    let abilitiesElement = document.createElement('p');
    abilitiesElement.innerText = 'Abilities: ' + pokemon.abilities.join(', ');

    modal.append(closeButtonElement);
    modal.append(nameElement);
    modal.append(imageElement);
    modal.append(heightElement);
    modal.append(weightElement);
    modal.append(typesElement);
    modal.append(abilitiesElement);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', e => {
    if (
      e.key === 'Escape' &&
      $modalContainer.classList.contains('is-visible')
    ) {
      hideModal();
    }
  });

  $modalContainer.addEventListener('click', e => {
    /* Since this is also triggered when clicking INSIDE the modal container,
    We only want to close if the user clicks directly on the overlay */
    let target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });
//function to fetch the list of pokemon items to API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(pokemon) {
          var pokemon = {
            name: pokemon.name,
            detailsUrl: pokemon.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }
// function to fetch pokemon details from pokemon items
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        // For types and abilities I'm not sure how to add a space for when the modal lists them - variablename.join(', '); - if it solves it, how do I implement it?
        pokemon.types = [];
        for (let i = 0; i < details.types.length; i++) {
          pokemon.types.push(details.types[i].type.name);
        }
        pokemon.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          pokemon.abilities.push(details.abilities[i].ability.name);
        }
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    showModal: showModal,
    hideModal: hideModal,
    /* showDetails and loadDetails are private functions and as we are not using them from outside the IIFE
    they don't NEED to be returned */
    showDetails: showDetails,
    loadDetails: loadDetails
  };
})(); // end of IIFE

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});