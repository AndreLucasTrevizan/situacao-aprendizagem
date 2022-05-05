const db = require('../database/DbConnection');

class SalaController {

    ListarSalas(req, res) {
        let sql = 'SELECT * FROM RelatorioSalas';

        db.query(sql, (err, rows) => {
            if(err) res.status(400).json({error: err.message});
        
            res.status(200).json(rows);
        });
    }

    ListarSalaPorId(req, res) {
        let {id} = req.params;
        let sql = 'SELECT * FROM sala WHERE sala.id = ?';
    
        db.query(sql, id, (err, rows) => {
            if(err) res.status(400).json({error: err.message});
        
            res.status(200).json(rows[0]);
        });
    }
    
    CriarSala(req, res) {
        let {numero, bloco, apelido, descricao_tipo, capacidade} = req.body;
        let sql = 'CALL InsereSala(?, ?, ?, ?, ?)';
        
        db.query(sql, [
            numero, bloco, apelido, descricao_tipo, capacidade
        ], (err, rows) => {
            if(err) res.status(400).json({error: err.message});

            res.status(201).json(rows);
        });
    }

    EditarSala(req, res) {
        let {id, numero, bloco, apelido, descricao_tipo, capacidade} = req.body;
        let sql = 'CALL EditarSala(?, ?, ?, ?, ?, ?)';

        db.query(sql, [
            id, numero, bloco, apelido, descricao_tipo, capacidade
        ], (err, rows) => {
            if(err) res.status(400).json({error: err.message});

            req.status(200).json(rows);
        });
    }

    DeletarSala(req, res) {
        let {id} = req.body;
        let sql = 'CALL DeletarSala(?)';

        db.query(sql, id, (err, rows) => {
            if(err) res.status(400).json({error: err.message});

            res.status(200).json(rows);
        });
    }

}

module.exports = new SalaController();