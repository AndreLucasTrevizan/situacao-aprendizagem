const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');

const ReservaController = require('../../controllers/ReservaController');

router.route('/reservas')
    .all(auth)
    .post(ReservaController.criarReserva)
    .put(ReservaController.editarReserva);

router.route('/reservas/:id')
    .all(auth)
    .get(ReservaController.ListarReservaPorId)
    .delete(ReservaController.deletarReserva);

router.route('/reservas/dia/:dt_reserva')
    .all(auth)
    .get(ReservaController.ListarReservas);

module.exports = router;