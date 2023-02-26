const router = require('express').Router();
const { Types } = require('../db');

router.get('/', async (req, res) => {
    try {
        const types = await Types.findAll();
        res.send(types);
    } catch (err) {
        console.log(err.message);
        res.send({ msg: err.message });
    }
})