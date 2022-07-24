const express = require('express');
const router = express.Router();

const isAdmin = require('../../middlewares/isAdmin');
const auth = require('../../middlewares/auth');

const ReservaController = require('../../controllers/ReservaController');

router.route('/reservas')
    .all(auth, isAdmin)
    .post(ReservaController.criarReserva)
    .put(ReservaController.editarReserva);

router.route('/reservas/:id')
    .all(isAdmin)
    .get(ReservaController.ListarReservaPorId)
    .delete(ReservaController.deletarReserva);

router.route('/reservas/dia/:dt_reserva')
    .all(auth, isAdmin)
    .get(ReservaController.ListarReservas);

module.exports = router;