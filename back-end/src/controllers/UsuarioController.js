const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioService = require('../services/UsuarioService');

class UsuarioController {

    async Login(req, res) {
        try {
            let {email, senha} = req.body;
            let emailUser = await new UsuarioService(req.dbConn).findByEmail(email);

            if(emailUser && bcryptjs.compareSync(senha, emailUser.senha)) {
                if(emailUser.funcao != 2) {
                    if(emailUser.situacao != 1) {
                        res.status(402).json({error: 'Usuário inativo, por favor, contate o administrador'});
                    } else {
                        let user = {
                            id: emailUser.id,
                            avatar: emailUser.avatar,
                            nome: emailUser.nome,
                            email: emailUser.email,
                            funcao: emailUser.funcao,
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
            res.status(500).json({error: error});
        }
    }

    async ListarUsuarios(req, res) {
        try {
            let usuarios = await new UsuarioService(req.dbConn).findAll();
            
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
            let {id, nome, cpf, dt_nascimento, sexo, email} = req.body;
            let avatar = (req.file !== undefined) ? req.file.filename : req.body.avatar;

            let user = await new UsuarioService(req.dbConn).updateProfile([
                nome, avatar, cpf, dt_nascimento, sexo, email, id
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