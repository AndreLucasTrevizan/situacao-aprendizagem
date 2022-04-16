const express = require('express');
const UsuarioService = require('../services/UsuariosServices');
class UsuarioController {

    ListarUsuarios(req, res) {
        let users = UsuarioService.ListarUsuarios();
        res.status(200).json(users);
    }

    ListarUsuarioPorId(req, res) {
        let user = UsuarioService.ListarUsuarioPorId(req.params);
        res.status(200).json(user);
    }

    ListarUsuarioPorEmail(req, res) {
        let user = UsuarioService.ListarUsuarioPorEmail(req.body);
        res.status(200).json(user);
    }

    CriarUsuario(req, res) {
        let isValidEmail = UsuarioService.ListarUsuarioPorEmail(req.body);
        if(!isValidEmail) {
            let user = UsuarioService.CriarUsuario(req.file, req.body);
            res.status(201).json(user);
        } else {
            res.status(406).json({msg: 'Email já cadastrado.'});
        }
    }

    EditarUsuario(req, res) {
        UsuarioService.EditarUsuario(req.body);
        res.status(200).json({msg: 'Usuário Atualizado.'});
    }

    DeletarUsuario(req, res) {
        UsuarioService.DeletarUsuario(req.params);
        res.status(200).json({msg: 'Usuário deletado.'});
    }

}

module.exports = new UsuarioController();