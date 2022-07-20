const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioService = require('../services/UsuarioService');

class UsuarioController {

    async Login(req, res) {
        try {
            let {email, senha} = req.body;
            let userInDb = await new UsuarioService(req.dbConn).findByEmail(email);

            if(userInDb && bcryptjs.compareSync(senha, userInDb.senha)) {
                if(userInDb.funcao != 2) {
                    if(userInDb.situacao != 1) {
                        res.status(402).json({error: 'Usuário inativo, por favor, contate o administrador'});
                    } else {
                        delete userInDb['senha'];
                        delete userInDb['cpf'];
                        let token = jwt.sign(userInDb, process.env.SECRET, {expiresIn: '1h'});
        
                        res.status(200).json({...userInDb, token: token});
                    }
                } else {
                    res.status(402).json({error: 'Você não tem permissão de acessar essa aplicação'});
                }
            } else {
                res.status(403).json({error: 'Email ou senha inválidos'});
            }
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async ListarUsuarios(req, res) {
        try {
            let usuarios;
            console.log(req.query.filter);

            if(req.query.filter == 'todos') {
                usuarios = await new UsuarioService(req.dbConn).filterUsersByRole();
            }

            if(req.query.filter == 'professores') {
                usuarios = await new UsuarioService(req.dbConn).filterUsersByRole(3);
            }

            if(req.query.filter == 'alunos') {
                usuarios = await new UsuarioService(req.dbConn).filterUsersByRole(2);
            }
            
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async ListarUsuarioPorNome(req, res) {
        try {
            let usuario = await new UsuarioService(req.dbConn).findByName(req.body.name);

            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async ListarUsuarioPorId(req, res) {
        try {
            let usuario = await new UsuarioService(req.dbConn).findById(req.params.id);
            
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async CriarUsuario(req, res) {
        try {
            let {nome, cpf, dt_nascimento, sexo, email, senha, funcao} = req.body; 
            let avatar = (req.file !== undefined) ? req.file.filename : 'default.jpg';
            let hash = bcryptjs.hashSync(senha, 15);

            let usuario = await new UsuarioService(req.dbConn, {
                avatar: avatar,
                nome: nome,
                cpf: cpf,
                dt_nascimento: dt_nascimento,
                sexo: sexo,
                email: email,
                senha: hash,
                funcao: funcao
            }).insert();

            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async EditarPerfil(req, res) {
        try {
            console.log(req.user);
            let {nome, cpf, dt_nascimento, sexo, email} = req.body;
            let avatar = (req.file !== undefined) ? req.file.filename : req.body.avatar;

            let user = await new UsuarioService(req.dbConn).updateProfile([
                nome, avatar, cpf, dt_nascimento, sexo, email, req.user.id
            ]);

            res.status(200).json({...user, avatar: avatar});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async EditarUsuario(req, res) {
        try {
            let {id, nome, cpf, dt_nascimento, sexo, email, situacao, funcao} = req.body;
            
            await new UsuarioService(req.dbConn).update([
                id, nome, cpf, dt_nascimento, sexo, email, situacao, funcao
            ]);

            res.status(200).json({msg: 'Usuário atualizado'});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async DeletarUsuario(req, res) {
        try {
            await new UsuarioService(req.dbConn).delete(req.body.id);

            res.status(200).json({msg: 'Usuário deletado'});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

}

module.exports = new UsuarioController();