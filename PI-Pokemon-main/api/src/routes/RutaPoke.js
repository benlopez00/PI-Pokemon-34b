const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Pokemon, Types } = require('../db');
const { setOrder, filters } = require('./Helpers')

router.get('/', async (req, res) => {
    let { name, typeFilter, order, created } = req.query

    try {
        if (created !== 'default' && created == true) {
            const createdInDb = await Pokemon.findAll({ where: { createdDb: created } });
            if (!createdInDb.length) {
                return res.send({ msg: "You still haven't catched any new pokemon :(" })
            }
            return res.send(createdInDb);
        }

        if (name && name !== '') {  
            const poke = await Pokemon.findAll(
                {where: {name: { [Op.iLike]: `%${name}%` }},
                include: {
                    model: Types,
                    attributes: ['name'],
                    through: { attributes: [], }
                }
            })
            if (poke?.length) return res.status(200).send(poke);
            else return res.status(404).send(`The pokemon "${name}" is not in the pokedex`);
        }

        if (typeFilter !== "default" && typeFilter) {
            const filteredPoke = await filters(typeFilter, order !== 'default' && order ? order : null);
            return res.send(filteredPoke);
        }

        var allPokeNoMods = await Pokemon.findAll({
            include: {
                model: Types,
                attributes: ['name'],
                through: { attributes: [], }
            }
        })

        if (order !== 'default' && order) {
            allPokeNoMods = setOrder(allPokeNoMods, order);
        }
        res.send(allPokeNoMods); // return All
    } catch (err) {
        console.log("here be error", err.message);
        res.send({ msg: err.message });
    }

})