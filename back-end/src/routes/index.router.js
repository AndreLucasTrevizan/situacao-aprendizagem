const express = require('express');
const router = express.Router();

const UsuarioRouter = require('./usuarios/router');
const TurmaRouter = require('./turmas/router');
const SalaRouter = require('./salas/router');
const ReservaRouter = require('./reservas/router');

router.use('/',
    UsuarioRouter,
    TurmaRouter,
    SalaRouter,
    ReservaRouter
);

module.exports = router;