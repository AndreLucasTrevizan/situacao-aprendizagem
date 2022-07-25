const express = require('express');
const router = express.Router();

const isAdmin = require('../../middlewares/isAdmin');
const auth = require('../../middlewares/auth');

const SalaController = require('../../controllers/SalaController');

router.route('/salas')
    .all(auth)
    .get(SalaController.ListarSalas);

router.route('/salas')
    .all(isAdmin)
    .post(SalaController.CriarSala)
    .put(SalaController.EditarSala);

router.route('/salas/:id')
    .all(isAdmin)
    .get(SalaController.ListarSalaPorId)
    .delete(SalaController.DeletarSala);

module.exports = router;