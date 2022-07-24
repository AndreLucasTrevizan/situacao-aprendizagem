const express = require('express');
const router = express.Router();

const isAdmin = require('../../middlewares/isAdmin');
const auth = require('../../middlewares/auth');

const TurmaController = require('../../controllers/TurmaController');

router.route('/turmas')
    .all(auth, isAdmin)
    .get(TurmaController.ListarTurmas)
    .post(TurmaController.CriarTurma)
    .put(TurmaController.EditarTurma);

router.route('/turmas/:id')
    .all(isAdmin)
    .get(TurmaController.ListarTurmaPorId)
    .delete(TurmaController.DeletarTurma);

module.exports = router;