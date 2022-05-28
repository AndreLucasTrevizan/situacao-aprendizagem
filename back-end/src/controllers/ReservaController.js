class ReservaController {

    async ListarReservaPorId(req, res) {
        try {
            let {id} = req.params;
            let sql = 'SELECT * FROM reserva WHERE id = ?';
            let [response] = await req.dbConn.query(sql, id);
            res.status(200).json(response[0]);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async ListarReservas(req, res) {
        try {
            let {dt_reserva} = req.params;
            let sql = `
                SELECT 
                    sala.apelido as sala,
                    turma.apelido as turma,
                    usuario.avatar as avatar,
                    usuario.nome as usuario,
                    usuario.funcao as funcao,
                    reserva.id as id,
                    reserva.id_usuario as id_usuario,
                    reserva.justificativa as justificativa,
                    reserva.periodo as periodo,
                    reserva.createdAt as createdAt,
                    reserva.updatedAt as updatedAt
                FROM reserva
                INNER JOIN sala on sala.id = reserva.id_sala
                INNER JOIN turma on turma.id = reserva.id_turma
                INNER JOIN usuario on usuario.id = reserva.id_usuario
                WHERE reserva.dt_reserva = ?;
            `;
            let [dbData] = await req.dbConn.query(sql, dt_reserva);

            res.status(200).json(dbData);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async criarReserva(req, res) {
        try {
            let {justificativa, dt_reserva, periodo, id_sala, id_turma, id_usuario} = req.body;
            let sql = 'CALL InsereReserva(?, ?, ?, ?, ?, ?)';
            let sql_verifica_data = 'SELECT * FROM reserva WHERE reserva.id_sala = ? AND reserva.periodo = ? AND reserva.dt_reserva = ?';

            let [reservaPorData] = await req.dbConn.query(sql_verifica_data, [id_sala, dt_reserva]);
            
            if(reservaPorData.length > 0) {
                res.status(400).json({error: `Sala já cadastrada para o periodo ${periodo} no dia selecionado`});
            } else {
                let result = await req.dbConn.query(sql, [
                    justificativa, dt_reserva, periodo, id_usuario, id_sala, id_turma
                ]);

                res.status(201).json(result);
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async editarReserva(req, res) {
        try {
            let {id, justificativa, dt_reserva, periodo, id_sala, id_turma, id_usuario} = req.body;
            let sql = 'CALL EditarReserva(?, ?, ?, ?, ?, ?, ?)';

            let result = await req.dbConn.query(sql, [
                id, justificativa, dt_reserva, periodo, id_usuario, id_sala, id_turma
            ]);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async deletarReserva(req, res) {
        try {
            let {id} = req.body;
            let sql = 'CALL DeletarReserva(?)';

            let result = await req.dbConn.query(sql, id);
            
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

module.exports = new ReservaController();