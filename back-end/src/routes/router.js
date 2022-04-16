const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/UsuarioController');

router.get('/usuarios', UsuariosController.ListarUsuarios);
router.post('/usuarios', UsuariosController.CriarUsuario);
router.put('/usuarios', UsuariosController.EditarUsuario);
router.delete('/usuarios/:id', UsuariosController.DeletarUsuario);

router.post('/usuario', (req, res) => {
    let user = req.body;
    res.status(201).json(user);
});

module.exports = router;