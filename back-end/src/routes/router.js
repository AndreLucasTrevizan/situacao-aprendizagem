const express = require('express');
const router = express.Router();
const passport = require('passport');

const isAdmin = require('../middlewares/isAdmin');
const auth = require('../middlewares/auth');
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
router.post('/usuarios/filtro', isAdmin, UsuariosController.ListarUsuarioPorNome);
router.get('/usuarios/:id', UsuariosController.ListarUsuarioPorId);
router.post('/usuarios', isAdmin, uploadAvatar, UsuariosController.CriarUsuario);
router.put('/usuarios/perfil', auth, uploadAvatar, UsuariosController.EditarPerfil);
router.put('/usuarios', isAdmin, UsuariosController.EditarUsuario);
router.delete('/usuarios', isAdmin, UsuariosController.DeletarUsuario);

router.get('/turmas', TurmasController.ListarTurmas);
router.get('/turmas/:id', TurmasController.ListarTurmaPorId); 
router.post('/turmas', isAdmin, TurmasController.CriarTurma);
router.put('/turmas', isAdmin, TurmasController.EditarTurma);
router.delete('/turmas/:id', isAdmin, TurmasController.DeletarTurma);

router.get('/salas', SalasController.ListarSalas);
router.get('/salas/:id', SalasController.ListarSalaPorId);
router.post('/salas', isAdmin, SalasController.CriarSala);
router.put('/salas', isAdmin, SalasController.EditarSala);
router.delete('/salas/:id', isAdmin, SalasController.DeletarSala);

router.get('/reservas/dia/:dt_reserva', ReservasController.ListarReservas);
router.get('/reservas/:id', ReservasController.ListarReservaPorId);
router.post('/reservas', ReservasController.criarReserva);
router.put('/reservas', ReservasController.editarReserva);
router.delete('/reservas/:id', ReservasController.deletarReserva);

module.exports = router; 