let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  //let modalContainer = document.querySelector('#modal-container');

  function getAll() {
    return pokemonList;
}
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    // added Bootstrap utility class for li elements
    listItem.classList.add("list-group-item");
    button.innerText = pokemon.name;
    // added Bootstrap button utility classes
    button.classList.add("btn", "btn-primary", "btn-lg");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal-container");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    // adding an event listener for button
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (pokemon) {
          var pokemon = {
            name: pokemon.name,
            detailsUrl: pokemon.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  // show the Modal with Pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Details we want to add
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.types = details.types;
        item.height = details.height;
        item.weight = details.weight;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  let modal = document.querySelector(".modal");

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(pokemon) {
    let modalBody = document.querySelector(".modal-body");
    let modalHeader = document.querySelector(".modal-header");
    modalBody.innerHTML = "";

    let modalTitle = document.querySelector(".modal-title");
    var capitalizedName = pokemon.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    modalTitle.innerHTML = capitalizedName;

    let closeButtonElement = document.querySelector(".close");

    let imageFront = document.createElement("img");
    imageFront.classList.add("modal-img");
    imageFront.src = pokemon.imageUrlFront;
    imageFront.alt = "Front image of " + pokemon.name;

    let imageBack = document.createElement("img");
    imageBack.classList.add("modal-img");
    imageBack.src = pokemon.imageUrlBack;
    imageBack.alt = "Back image of " + pokemon.name;

    let typesElement = document.createElement("p");
    let types = [pokemon.types[0].type.name];
    for (let i = 1; i < pokemon.types.length; i++) {
      types.push(", " + pokemon.types[i].type.name);
    }
    typesElement.innerHTML = "Types: " + types.join("");

    let heightElement = document.createElement("p");
    heightElement.innerHTML = "Height: " + pokemon.height;

    let weigthElement = document.createElement("p");
    weigthElement.innerHTML = "Weigth: " + pokemon.weight;

    let abilities = document.createElement("p");
    let abilitiesList = [pokemon.abilities[0].ability.name];
    for (let i = 1; i < pokemon.abilities.length; i++) {
      abilitiesList.push(", " + pokemon.abilities[i].ability.name);
    }
    abilities.innerHTML = "Abilities: " + abilitiesList.join("");

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButtonElement);
    modalBody.appendChild(imageFront);
    modalBody.appendChild(imageBack);
    modalBody.appendChild(typesElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weigthElement);
    modalBody.appendChild(abilities);
  }

  function hideModal() {
    modal.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-visible")) {
      hideModal();
    }
  });
  modal.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modal) {
      hideModal();
    }
  });
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

