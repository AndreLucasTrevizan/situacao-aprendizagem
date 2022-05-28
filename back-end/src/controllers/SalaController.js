class SalaController {

    async ListarSalas(req, res) {
        try {
            let sql = 'SELECT * FROM RelatorioSalas';

            let [result] = await req.dbConn.query(sql);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async ListarSalaPorId(req, res) {
        try {
            let {id} = req.params;
            let sql = 'SELECT * FROM sala WHERE sala.id = ?';
        
            let [result] = await req.dbConn.query(sql, id);

            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    
    async CriarSala(req, res) {
        try {
            let {numero, bloco, apelido, descricao_tipo, capacidade} = req.body;
            let sql = 'CALL InsereSala(?, ?, ?, ?, ?)';
            
            let result = await req.dbConn.query(sql, [
                numero, bloco, apelido, descricao_tipo, capacidade
            ]);

            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async EditarSala(req, res) {
        try {
            let {id, numero, bloco, apelido, descricao_tipo, capacidade} = req.body;
            let sql = 'CALL EditarSala(?, ?, ?, ?, ?, ?)';

            let result = await req.dbConn.query(sql, [
                id, numero, bloco, apelido, descricao_tipo, capacidade
            ]);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async DeletarSala(req, res) {
        try {
            let {id} = req.body;
            let sql = 'CALL DeletarSala(?)';

            let result = await req.dbConn.query(sql, id);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

module.exports = new SalaController();