const express = require('express');
const router = express.Router();

const isAdmin = require('../middlewares/isAdmin');
const uploadAvatar = require('../middlewares/uploadAvatar');

const UsuariosController = require('../controllers/UsuarioController');
const TurmasController = require('../controllers/TurmaController');

router.post('/login', UsuariosController.Login);

router.get('/usuarios', isAdmin, UsuariosController.ListarUsuarios);
router.get('/usuarios/:id', UsuariosController.ListarUsuarioPorId);
router.post('/usuarios', uploadAvatar, UsuariosController.CriarUsuario);
router.put('/usuarios', UsuariosController.EditarUsuario);
router.delete('/usuarios', UsuariosController.DeletarUsuario);

router.get('/turmas', TurmasController.ListarTurmas);
router.post('/turmas', TurmasController.CriarTurma);
router.put('/turmas', TurmasController.EditarTurma);
router.delete('/turmas/:id', TurmasController.DeletarTurma);


module.exports = router;