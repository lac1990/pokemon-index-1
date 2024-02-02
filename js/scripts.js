
//IFFE
let pokemonRepository = (function () {
//Array for pokemon
  let pokemonList = [
  { 
  name: "Eevee", 
  height: .3, 
  type: "normal",
  ability: "runaway" },
  {
  name: "Flareon",
  height: .9,
  type: "fire",
  ability: "flash-fire",
  },
  { 
  name: "Joleton", 
  height: .8, 
  type: "electric",
  ability: "volt-absorb" 
  },  
  {
  name: "Vaporeon",
  height: 1,
  type: "water",
  ability: "water-absorb",
  },
  ];
//function gathering pokemonList
function getAll() {
  return pokemonList;
}

// add item to list
function add(pokemon){
  //Validation of data input
  if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
  ) {
      pokemonList.push(pokemon);
  }else{
      console.log("failed to add pokemon")
  }     
}
function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listPokemon = document.createElement("li");
  let button = document.createElement("button"); 
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listPokemon.appendChild(button);
  pokemonList.appendChild(listPokemon);
  button.addEventListener('click', () => showDetails(pokemon));
};
return{
  add: add,
  getAll: getAll,
  addListItem: addListItem,
};
function showDetails(pokemon){
  console.log(pokemon);
}
}) ();
//forEach Loop to iterate through PokeDex
pokemonRepository.getAll().forEach(function (pokemon) {
pokemonRepository.addListItem(pokemon);
});