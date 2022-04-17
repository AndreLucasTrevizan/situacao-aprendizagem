const db = require('../database/DbConnection');
const bcryptjs = require('bcryptjs');

class UsuarioRepository {

    ListarUsuarios() {
        return db.promise().query('SELECT * FROM RelatorioUsuarios;');
    }

    ListarUsuarioPorId(data) {
        let {id} = data;

        return db.promise().query('SELECT * FROM usuario WHERE `id` = ?', id);
    }

    ListarUsuarioPorEmail(data) {
        let {email} = data;

        return db.promise().query('SELECT * FROM usuario WHERE `email` = ?', email);
    }

    CriarUsuario(data) {
        let {avatar, nome, cpf, dataNascimento, sexo, email, senha, funcao} = data; 
        let hash = bcryptjs.hashSync(senha, 15);
        let sql = `
            CALL InsereUsuario(?, ?, ?, ?, ?, ?, ?, ?);
        `;

        return db.promise().query(sql, [
            avatar, nome, cpf, dataNascimento, sexo, email, hash, funcao
        ]);
    }

    EditarUsuario(data) {
        let {id, nome, cpf, dataNascimento, sexo, email, situacao, funcao} = data;
        let sql = `
            CALL EditarUsuario(?, ?, ?, ?, ?, ?, ?);
        `;

        return db.promise().query(sql, [
            nome, cpf, dataNascimento, sexo, email, situacao, funcao, id
        ]);
    }

    DeletarUsuario(data) {
        let {id} = data;
        let sql = `
            CALL DeletarUsuario(?);
        `;

        return db.promise().query(sql, id);
    }

}

module.exports = new UsuarioRepository();