const ReservasService = require('../services/ReservasService');

class ReservaController {

    async ListarReservaPorId(req, res) {
        try {
            let result = await new ReservasService(req.dbConn).findById(req.params.id);

            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async ListarReservas(req, res) {
        try {
            let {dt_reserva} = req.params;
            let dbData = await new ReservasService(req.dbConn).findAll(dt_reserva);

            res.status(200).json(dbData);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async criarReserva(req, res) {
        try {
            let {dt_reserva, periodo, id_sala} = req.body;
            let verifica_sala = await new ReservasService(req.dbConn).check([id_sala, periodo, dt_reserva]);
            
            if(verifica_sala) {
                res.status(400).json({error: `Sala já cadastrada para o periodo ${periodo} no dia selecionado`});
            } else {
                let result = await new ReservasService(req.dbConn, req.body).insert();

                res.status(201).json(result);
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async editarReserva(req, res) {
        try {
            let {id, justificativa, dt_reserva, periodo, id_sala, id_turma, id_usuario} = req.body;
            
            let result = await new ReservasService(req.dbConn).update([
                id, justificativa, dt_reserva, periodo, id_usuario, id_sala, id_turma
            ]);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async deletarReserva(req, res) {
        try {
            let result = await new ReservasService(req.dbConn).delete(req.params.id);
            
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

module.exports = new ReservaController();