const express = require('express');
const router = express.Router();

const isAdmin = require('../../middlewares/isAdmin');
const auth = require('../../middlewares/auth');
const uploadAvatar = require('../../middlewares/uploadAvatar');

const UsuariosController = require('../../controllers/UsuarioController');

router.route('/usuarios')
    .all(isAdmin)
    .get(UsuariosController.ListarUsuarios)
    .put(UsuariosController.EditarUsuario)
    .delete(UsuariosController.DeletarUsuario);

router.route('/usuarios/filtro')
    .all(isAdmin)
    .get(UsuariosController.ListarUsuarioPorNome);

router.route('/usuarios')
    .all(isAdmin, uploadAvatar)
    .post(UsuariosController.CriarUsuario);

    // Testar se o get Id pelo token vai funcionar
router.route('/usuarios')
    .all(auth)
    .get(UsuariosController.ListarUsuarioPorId);

router.route('/usuarios/perfil')
    .all(auth, uploadAvatar)
    .put(UsuariosController.EditarPerfil);

router.route('/login')
    .post(UsuariosController.Login);

module.exports = router;