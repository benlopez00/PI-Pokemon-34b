const { Pokemon, Types } = require('../db')
const axios = require('axios');

const getPokemonsFromApi = async () => {
    const pokemons = await axios('https://pokeapi.co/api/v2/pokemon?limit=40');
    const mapUrl = await pokemons.data.results.map(e => { return e.url })
    var arrayPokedex = [];
    for (var i = 0; i < mapUrl.length; i++) {
        const url = await axios(mapUrl[i])
        arrayPokedex.push({
            idPoke: url.data.id,
            name: url.data.name,
            height: url.data.height,
            weight: url.data.weight,
            hp: url.data.stats.find(e => e.stat.name === 'hp').base_stat,
            attack: url.data.stats.find(e => e.stat.name === 'attack').base_stat,
            defense: url.data.stats.find(e => e.stat.name === 'defense').base_stat,
            speed: url.data.stats.find(e => e.stat.name === 'speed').base_stat,
            types: url.data.types.map(e => e = { name: e.type.name }),
            img: url.data.sprites.other["official-artwork"].front_default,
        }
        );
    }
    return arrayPokedex;
}

const getTypes = async function () {
    let typesInDb = []
    try {
        typesInDb = await Types.findAll({ where: { createdDb: true } })
        const isPopulated = await Types.count();
        if (isPopulated === typesInDb.length) {
            const api = await axios.get('https://pokeapi.co/api/v2/type');
            const apiTypes = api.data.results.map(e => e.name)
            for (let i = 0; i < apiTypes.length; i++) {
                if (apiTypes[i] == "shadow" || apiTypes[i] == "unknown") {
                    continue;
                }
                Types.findOrCreate({
                    where: { name: apiTypes[i] }
                })
            }
        }
        console.log("Loaded - Types:", await Types.count());
    } catch (err) {
        console.log(err.message);
    }
}

const createFromApi = async function () {
    try {
        const pokemonsInDb = await Pokemon.findAll({ where: { createdDb: true } })
        const count = await Pokemon.count();
        if (pokemonsInDb.length === count) { 
            const apiPoke = await getPokemonsFromApi();
            for (var i = 0; i < apiPoke.length; i++) {
                let newPoke = await Pokemon.create({
                    idPoke: apiPoke[i].idPoke,
                    name: apiPoke[i].name,
                    height: apiPoke[i].height,
                    weight: apiPoke[i].weight,
                    hp: apiPoke[i].hp,
                    attack: apiPoke[i].attack,
                    defense: apiPoke[i].defense,
                    speed: apiPoke[i].speed,
                    img: apiPoke[i].img
                })
                let typeDb = await Types.findAll({ where: { name: apiPoke[i].types[0].name } })
                newPoke.addType(typeDb);
                if (apiPoke[i].types[1]) {
                    let typeDb2 = await Types.findAll({ where: { name: apiPoke[i].types[1].name } })
                    newPoke.addType(typeDb2);
                }
            }
        }
        console.log("Loaded - Pokemons:", await Pokemon.count());
    } catch (err) {
        console.log(err.message);
    }
}

const loadDb = async function () {
    await getTypes();
    await createFromApi();
}

module.exports = {
    loadDb,
};