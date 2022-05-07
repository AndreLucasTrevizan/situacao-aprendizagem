const express = require('express');
const router = express.Router();

const isAdmin = require('../middlewares/isAdmin');
const uploadAvatar = require('../middlewares/uploadAvatar');

const UsuariosController = require('../controllers/UsuarioController');
const TurmasController = require('../controllers/TurmaController');
const SalasController = require('../controllers/SalaController');

router.post('/login', UsuariosController.Login);

router.get('/usuarios', isAdmin, UsuariosController.ListarUsuarios);
router.get('/usuarios/:id', UsuariosController.ListarUsuarioPorId);
router.post('/usuarios', uploadAvatar, UsuariosController.CriarUsuario);
router.put('/usuarios', UsuariosController.EditarUsuario);
router.delete('/usuarios', UsuariosController.DeletarUsuario);

router.get('/turmas', TurmasController.ListarTurmas);
router.get('/turmas/:id', TurmasController.ListarTurmaPorId);
router.post('/turmas', TurmasController.CriarTurma);
router.put('/turmas', TurmasController.EditarTurma);
router.delete('/turmas', TurmasController.DeletarTurma);

router.get('/salas', SalasController.ListarSalas);
router.get('/salas/:id', SalasController.ListarSalaPorId);
router.post('/salas', SalasController.CriarSala);
router.put('/salas', SalasController.EditarSala);
router.delete('/salas', SalasController.DeletarSala);

module.exports = router;