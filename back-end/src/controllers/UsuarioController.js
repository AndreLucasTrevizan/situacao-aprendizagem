const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsuarioController {

    async Login(req, res) {
        try {
            let {email, senha} = req.body;
            let sql = 'SELECT * FROM usuario WHERE `email` = ?';
            let [result] = await req.dbConn.query(sql, email);

            if(result.length != 0 && bcryptjs.compareSync(senha, result[0].senha)) {
                if(result[0].funcao != 2) {
                    if(result[0].situacao != 1) {
                        res.status(402).json({error: 'Usuário inativo, por favor, contate o administrador'});
                    } else {
                        let user = {
                            id: result[0].id,
                            avatar: result[0].avatar,
                            nome: result[0].nome,
                            email: result[0].email,
                            funcao: result[0].funcao,
                        };
                        let token = jwt.sign(user, process.env.SECRET, {expiresIn: '1h'});
        
                        res.status(200).json({...user, token: token});
                    }
                } else {
                    res.status(402).json({error: 'Você não tem permissão de acessar essa aplicação'});
                }
            } else {
                res.status(403).json({error: 'Email ou senha inválidos'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async ListarUsuarios(req, res) {
        try {
            let sql = 'SELECT * FROM RelatorioUsuarios;';

            let [result] = await req.dbConn.query(sql);
            
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async ListarUsuarioPorNome(req, res) {
        try {
            let {dt_filtro} = req.body;
            
            let sql = `SELECT * FROM usuario WHERE usuario.nome LIKE ?`;
            let [result] = await req.dbConn.query(sql, `%${dt_filtro}%`);
            
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async ListarUsuarioPorId(req, res) {
        try {
            let {id} = req.params;
            let sql = 'SELECT * FROM usuario WHERE `id` = ?';
            let [result] = await req.dbConn.query(sql, id);
            
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async ListarUsuarioPorEmail(req, res) {
        let {email} = req.body;
        let sql = 'SELECT id, nome, email FROM usuario WHERE `email` = ?';
        let [result] = await req.dbConn.query(sql, email);
        
        return result[0];
    }

    async CriarUsuario(req, res) {
        try {
            let {nome, cpf, dt_nascimento, sexo, email, senha, funcao} = req.body; 
            let avatar = (req.file !== undefined) ? req.file.filename : 'default.jpg';
            let hash = bcryptjs.hashSync(senha, 15);
            let sql = `CALL InsereUsuario(?, ?, ?, ?, ?, ?, ?, ?);`;

            let [result] = await req.dbConn.query(sql, [
                avatar, nome, cpf, dt_nascimento, sexo, email, hash, funcao
            ]);

            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async EditarPerfil(req, res) {
        try {
            let {id, nome, cpf, dt_nascimento, sexo, email} = req.body;
            let sql_busca = 'SELECT avatar FROM usuario WHERE id = ?';
            let [userDb] = await req.dbConn.query(sql_busca, id);
            let avatar = (req.file !== undefined) ? req.file.filename : userDb.avatar;
            let sql = `
                UPDATE usuario
                SET nome = ?, avatar = ?, cpf = ?, dt_nascimento = ?, sexo = ?, email = ?, updatedAt = current_timestamp
                WHERE id = ?
            `;

            let result = await req.dbConn.query(sql, [
                nome, avatar, cpf, dt_nascimento, sexo, email, id
            ]);

            res.status(200).json({...result, avatar: avatar});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async EditarUsuario(req, res) {
        try {
            let {id, nome, cpf, dt_nascimento, sexo, email, situacao, funcao} = req.body;
            let sql = `CALL EditarUsuario(?, ?, ?, ?, ?, ?, ?, ?);`;
            
            let result = await req.dbConn.query(sql, [
                id, nome, cpf, dt_nascimento, sexo, email, situacao, funcao
            ]);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async DeletarUsuario(req, res) {
        let {id} = req.body;
        let sql = `CALL DeletarUsuario(?);`;

        let result = await req.dbConn.query(sql, id);

        res.status(200).json(result);
    }

}

module.exports = new UsuarioController();