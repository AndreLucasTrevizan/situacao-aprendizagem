const db = require('../database/DbConnection');

class ReservaController {

    async ListarReservas(req, res) {
        try {
            let {dt_reserva} = req.params;
            let sql = 'SELECT * FROM reserva WHERE reserva.dt_reserva = ?';
            let dbData = await db.promise().query(sql, dt_reserva);

            res.status(200).json(dbData[0]);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async criarReserva(req, res) {
        let {justificativa, dt_reserva, periodo, id_sala, id_turma, id_usuario} = req.body;
        let sql = 'CALL InsereReserva(?, ?, ?, ?, ?, ?)';
        let sql_verifica_data = 'SELECT * FROM reserva WHERE reserva.id_sala = ? and reserva.dt_reserva = ?';
        let sql_verifica_periodo = 'SELECT * FROM reserva WHERE reserva.id_sala =? AND reserva.periodo = ?';
        let data = false;
        let periodo_valido = false;
        
        let dbReservaValida = await db.promise().query(sql_verifica_data, [
            id_sala, dt_reserva
        ]);

        if(dbReservaValida[0].length > 0) {
            data = true;
        }

        let dbReservaPeriodoValido = await db.promise().query(sql_verifica_periodo, [
            id_sala, periodo
        ]);

        if(dbReservaPeriodoValido[0].length > 0) {
            periodo_valido = true;
        }

        if(data && periodo_valido) {
            res.status(400).json({error: `Sala já cadastrada para o periodo ${periodo} no dia selecionado`});
        } else {
            db.query(sql, [
                justificativa, dt_reserva, periodo, id_usuario, id_sala, id_turma
            ], (err, rows) => {
                if(err) res.status(400).json({error: err.message});

                res.status(201).json(rows);
            });
        }
    }

}

module.exports = new ReservaController();