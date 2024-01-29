
//creating funcstion for pokedex
let pokemonRepository = (function () {
let pokemonList = [
  { 
  name: "eevee", 
  height: .3, 
  type: "normal",
  ability: "runaway" },
  {
  name: "flareon",
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
  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function () {
      return pokemonList;
    },
  };
})();
//document write pokedex with following puncuation 
document.write("" + "Pokémon" + "");
pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(
    " " +
    pokemon.name +
    "-" +
    " " +
    "height" +
    ":" +
    " " +
    pokemon.height +
    "," +
    " " +
    "type" +
    ":" +
    " " +
    pokemon.type +
    "," +
    " " +
    "ability" +
    ":" +
    " " +
    pokemon.ability +
    " "
  );
});