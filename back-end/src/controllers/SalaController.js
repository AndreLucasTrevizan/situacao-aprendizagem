const SalasService = require('../services/SalasService');

class SalaController {

    async ListarSalas(req, res) {
        try {
            let result = await new SalasService(req.dbConn).findAll();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async ListarSalaPorId(req, res) {
        try {
            let result = await new SalasService(req.dbConn).findById(req.params.id);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    
    async CriarSala(req, res) {
        try {
            await new SalasService(req.dbConn, req.body).insert();

            res.status(201).json({msg: 'Sala cadastrada'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async EditarSala(req, res) {
        try {
            let {numero, bloco, apelido, descricao_tipo, capacidade, id} = req.body;

            let result = await new SalasService(req.dbConn).update([
                id, numero, bloco, apelido, descricao_tipo, capacidade
            ]);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async DeletarSala(req, res) {
        try {
            await new SalasService(req.dbConn).delete(req.params.id);

            res.status(200).json({msg: 'Sala deletada'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

module.exports = new SalaController();