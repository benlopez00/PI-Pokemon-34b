const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokeTypes = require('./RutaTipo');
const Pokelist = require('./RutaPoke');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemon', Pokelist);
router.use('/type', pokeTypes);

module.exports = router;
