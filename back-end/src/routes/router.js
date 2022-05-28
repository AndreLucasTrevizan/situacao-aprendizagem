const express = require('express');
const router = express.Router();
const passport = require('passport');

const isAdmin = require('../middlewares/isAdmin');
const uploadAvatar = require('../middlewares/uploadAvatar');

const UsuariosController = require('../controllers/UsuarioController');
const TurmasController = require('../controllers/TurmaController');
const SalasController = require('../controllers/SalaController');
const ReservasController = require('../controllers/ReservaController');

passport.serializeUser(function(user, done) {
    done(null, user);
});
    
passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/auth/google/redirect', passport.authenticate('google', { session: false, failureRedirect: `http://localhost:8000/index.html` }), (req, res) => {
  res.json(req.user); //req.user has the redirection_url
});

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',passport.authenticate('facebook'), (req, res) => {
    res.json(req.user);
});

router.post('/login', UsuariosController.Login);

router.get('/usuarios', isAdmin, UsuariosController.ListarUsuarios);
router.post('/usuarios/filtro', UsuariosController.ListarUsuarioPorNome);
router.get('/usuarios/:id', UsuariosController.ListarUsuarioPorId);
router.post('/usuarios', uploadAvatar, UsuariosController.CriarUsuario);
router.put('/usuarios/perfil', uploadAvatar, UsuariosController.EditarPerfil);
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

router.get('/reservas/dia/:dt_reserva', ReservasController.ListarReservas);
router.get('/reservas/:id', ReservasController.ListarReservaPorId);
router.post('/reservas', ReservasController.criarReserva);
router.put('/reservas', ReservasController.editarReserva);
router.delete('/reservas', ReservasController.deletarReserva);

module.exports = router;