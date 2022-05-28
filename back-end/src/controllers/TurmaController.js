class TurmaController {

    async ListarTurmas(req, res) {
        try {
            let sql = 'SELECT * FROM RelatorioTurmas';

            let [result] = await req.dbConn.query(sql);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async ListarTurmaPorId(req, res) {
        try {
            let id = req.params.id;
            let sql = 'SELECT * FROM turma WHERE turma.id = ?';

            let [result] = await req.dbConn.query(sql, id);

            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async CriarTurma(req, res) {
        try {
            let {apelido, nome_curso, ano_inicio, duracao} = req.body;   
            let sql = 'SELECT * FROM turma WHERE turma.apelido = ?';

            let [turma] = await req.dbConn.query(sql, apelido);
            
            if(turma.length > 0) {
                res.status(406).json({error: 'Turma já cadastrada'});
            } else {
                let sql_dois = 'CALL InsereTurma(?, ?, ?, ?)';

                let result = req.dbConn.query(sql_dois, [
                    apelido, nome_curso, ano_inicio, duracao
                ]);

                res.status(201).json(result);
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async EditarTurma(req, res) {
        try {
            let {id, apelido, nome_curso, ano_inicio, duracao} = req.body;

            let sql = 'CALL EditarTurma(?, ?, ?, ?, ?)';

            let result = await req.dbConn.query(sql, [
                id, apelido, nome_curso, ano_inicio, duracao
            ]);

            res.status(200).json(result);
        } catch (error) {
            
        }
    }

    async DeletarTurma(req, res) {
        try {
            let {id} = req.body;

            let sql = 'CALL DeletarTurma(?);';

            let result = await req.dbConn.query(sql, id);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

module.exports = new TurmaController();