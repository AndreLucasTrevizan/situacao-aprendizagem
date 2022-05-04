const db = require('../database/DbConnection');

class TurmaController {

    ListarTurmas(req, res) {
        let sql = 'SELECT * FROM RelatorioTurmas';

        db.query(sql, (err, rows) => {
            if(err) res.status(400).json(err.message);

            res.status(200).json(rows);
        });
    }

    CriarTurma(req, res) {
        let {apelido, curso, ano_de_inicio, duracao} = req.body;   
        
        let sql = 'SELECT * FROM turma WHERE turma.apelido = ?';

        db.query(sql, apelido, (err, rows) => {
            if(err) res.status(400).json(err.message);

            if(rows.length != 0) {
                res.status(400).json({error: 'Turma já cadastrada'});
            } else {
                let sql_dois = 'CALL InsereTurma(?, ?, ?, ?)';

                db.query(sql_dois, [
                    apelido, curso, ano_de_inicio, duracao
                ], (err, rows) => {
                    if(err) res.status(400).json({error: err.message});

                    res.status(200).json(rows);
                });
            }
        });
    }

    EditarTurma(req, res) {
        let {id, apelido, curso, ano_de_inicio, duracao} = req.body;

        let sql = 'CALL EditarTurma(?, ?, ?, ?, ?)';

        db.query(sql, [
            id, apelido, curso, ano_de_inicio, duracao
        ], (err, rows) => {
            if(err) res.status(400).json(err.message);

            res.status(200).json(rows);
        });
    }

    DeletarTurma(req, res) {
        let {id} = req.params;

        let sql = 'CALL DeletarTurma(?)';

        db.query(sql, id, (err, rows) => {
            if(err) res.status(400).json(err.message);

            res.status(200).json(rows);
        });
    }

}

module.exports = new TurmaController();