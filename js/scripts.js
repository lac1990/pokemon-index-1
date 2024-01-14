
let pokemonList = [
    
    {
        name: 'eevee',
        height: '.3',
        type: ['normal'],
        abilities: ["runaway", "adaptability", "anticipation"]
    },
    
    {
        name: 'jolteon',
        height: '.8',
        type: 'electric',
        abilities: ["volt absorb", "quick-feet"]
    },

    {
        name: 'flareon',
        height: '.9',
        type: 'fire',
        abilities: ["flash-fire", "guts"]
    },

    {
        name: 'vaporeon',
        height: '1',
        type: 'water',
        abilities: ["water absorb", "hydration"]
    },
];

for (let i=0; i<pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
    if (pokemonList[i].height <=.9) {
    document.write('<br>');
    }
    else{
        document.write('That\'s a big pokemon!');
        document.write('<br>');
    }
    }