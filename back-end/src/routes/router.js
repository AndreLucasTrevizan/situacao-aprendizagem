const express = require('express');
const router = express.Router();

const isAdmin = require('../middlewares/isAdmin');
const uploadAvatar = require('../middlewares/uploadAvatar');

const UsuariosController = require('../controllers/UsuarioController');

router.get('/usuarios', isAdmin, UsuariosController.ListarUsuarios);
router.post('/usuarios', uploadAvatar, UsuariosController.CriarUsuario);
router.put('/usuarios', UsuariosController.EditarUsuario);
router.delete('/usuarios/:id', UsuariosController.DeletarUsuario);

router.post('/login', UsuariosController.Login);

module.exports = router;