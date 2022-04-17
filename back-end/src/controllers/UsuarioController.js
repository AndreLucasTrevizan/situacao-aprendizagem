const express = require('express');
const UsuarioService = require('../services/UsuariosServices');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsuarioController {

    Login(req, res) {
        UsuarioService.Login(req.body).then(result => {
            if(result[0].length > 0 && bcryptjs.compareSync(req.body.senha, result[0][0].senha)) {
                let user = {
                    nome: result[0][0].nome,
                    email: result[0][0].email,
                    funcao: result[0][0].funcao,
                };
                let token = jwt.sign(user, process.env.SECRET, {expiresIn: '1h'});
                
                res.status(200).json({...user, token: token});
            }
        }).catch(err => {
            res.status(400).json({msg: 'Email ou senha inválidos.'});
        });
    }

    ListarUsuarios(req, res) {
        UsuarioService.ListarUsuarios().then(result => {
            res.status(200).json(result[0]);
        }).catch(err => {
            res.status(400).json({error: err.message});
        });
    }

    ListarUsuarioPorId(req, res) {
        UsuarioService.ListarUsuarioPorId(req.params).then(result => {
            res.status(200).json(result[0]);
        }).catch(err => {
            res.status(400).json({error: err.message});
        });
    }

    CriarUsuario(req, res) {
        UsuarioService.CriarUsuario(req.file, req.body).then(result => {
            res.status(201).json(result);
        }).catch(err => {
            res.status(403).json({error: err.message});
        });
    }

    EditarUsuario(req, res) {
        UsuarioService.EditarUsuario(req.body).then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(400).json({error: err.message});
        });
    }

    DeletarUsuario(req, res) {
        UsuarioService.DeletarUsuario(req.params).then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(400).json({error: err.message});
        });
    }

}

module.exports = new UsuarioController();