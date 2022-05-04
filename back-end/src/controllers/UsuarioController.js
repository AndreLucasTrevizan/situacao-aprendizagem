const db = require('../database/DbConnection');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsuarioController {

    Login(req, res) {
        let {email, senha} = req.body;
        let sql = 'SELECT * FROM usuario WHERE `email` = ?';
        db.query(sql, email, (err, rows) => {
            if(err) res.status(400).json({error: err.message});

            if(rows.length > 0 && bcryptjs.compareSync(senha, rows[0].senha)) {
                let user = {
                    avatar: rows[0].avatar,
                    nome: rows[0].nome,
                    email: rows[0].email,
                    funcao: rows[0].funcao,
                };
                let token = jwt.sign(user, process.env.SECRET, {expiresIn: '1h'});

                res.status(200).json({...user, token: token});
            } else {
                res.status(400).json({error: 'Email ou senha inválidos.'});
            }
        });
    }

    ListarUsuarios(req, res) {
        let sql = 'SELECT * FROM RelatorioUsuarios;';

        db.query(sql, (err, rows) => {
            if(err) res.status(400).json(err.message);

            res.status(200).json(rows);
        });
    }

    ListarUsuarioPorId(req, res) {
        let {id} = req.params;
        let sql = 'SELECT * FROM usuario WHERE `id` = ?';

        db.query(sql, id, (err, rows) => {
            if(err) res.status(400).json(err);

            res.status(200).json(rows);
        });
    }

    CriarUsuario(req, res) {
        let {nome, cpf, dt_nascimento, sexo, email, senha, funcao} = req.body; 
        let avatar = (req.file !== undefined) ? req.file.filename : 'default.jpg';
        let hash = bcryptjs.hashSync(senha, 15);
        let sql = `CALL InsereUsuario(?, ?, ?, ?, ?, ?, ?, ?);`;

        db.query(sql, [
            avatar, nome, cpf, dt_nascimento, sexo, email, hash, funcao
        ], (err, rows) => {
            if(err) res.status(400).json(err);

            res.status(201).json(rows);
        });
    }

    EditarUsuario(req, res) {
        let {id, nome, cpf, dt_nascimento, sexo, email, situacao, funcao} = req.body;
        let sql = `CALL EditarUsuario(?, ?, ?, ?, ?, ?, ?, ?);`;

        db.query(sql, [
            id, nome, cpf, dt_nascimento, sexo, email, situacao, funcao
        ], (err, rows) => {
            if(err) res.status(400).json(err);

            res.status(200).json(rows);
        });
    }

    DeletarUsuario(req, res) {
        let {id} = req.body;
        let sql = `CALL DeletarUsuario(?);`;

        db.query(sql, id, (err, rows) => {
            if(err) res.status(400).json(err);

            res.status(200).json(rows);
        });
    }

}

module.exports = new UsuarioController();