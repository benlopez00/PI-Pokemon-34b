const { Pokemon } = require('../db')

const filters = async (typeFilter, orderBy) => {
    try {
        var filterType = await Pokemon.findAll({
            include: {
                model: Types,
                where: { 'name': typeFilter },
                attributes: ['name']
            },
        })
        if (filterType.length) { // Checkeo si encontró algo
            if (orderBy) return setOrder(filterType, orderBy);
            return filterType
        }
    } catch (err) {
        console.log(err.message)
        throw new Error({ msg: err.message })
    }
}

const setOrder = (pokemon, by) => {
    switch (by) {
        case "attackUp": {
            return pokemon.sort((a, b) => b.attack - a.attack)
        };
        case "attackDown": {
            return pokemon.sort((a, b) => a.attack - b.attack)
        };
        case "nameUp": {
            return pokemon.sort((a, b) => a.name.localeCompare(b.name))
        };
        case "nameDown": {
            return pokemon.sort((a, b) => b.name.localeCompare(a.name))
        };
        default: return pokemon;
    }
}


module.exports = {
    setOrder,
    filters,
};