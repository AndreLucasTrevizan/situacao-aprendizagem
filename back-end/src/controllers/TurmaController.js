const TurmaService = require('../services/TurmasService');

class TurmaController {

    async ListarTurmas(req, res) {
        try {
            let result = await new TurmaService(req.dbConn).findAll();

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async ListarTurmaPorId(req, res) {
        try {
            let result = await new TurmaService(req.dbConn).findById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message}); 
        }
    }

    async CriarTurma(req, res) {
        try {
            let turma = await new TurmaService(req.dbConn).findByApelido(req.body.apelido);
            
            if(turma) {
                res.status(406).json({error: 'Turma já cadastrada'});
            } else {
                let result = await new TurmaService(req.dbConn, req.body).insert();

                res.status(201).json(result);
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async EditarTurma(req, res) {
        try {
            let result = await new TurmaService(req.dbConn).update([
                req.body.id,
                req.body.apelido,
                req.body.nome_curso,
                req.body.ano_inicio,
                req.body.duracao
            ]);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async DeletarTurma(req, res) {
        try {
            let result = await new TurmaService(req.dbConn).delete(req.params.id);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

module.exports = new TurmaController();