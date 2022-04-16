const db = require('../database/DbConnection');
const bcryptjs = require('bcryptjs');

class UsuarioRepository {

    ListarUsuarios() {
        db.query('SELECT * FROM RelatorioUsuarios;', (err, rows) => {
            if(err) return false;

            return rows;
        });
    }

    ListarUsuarioPorId(data) {
        let {id} = data;

        db.query('select * from usuario where `id` = ?', id, (err, rows) => {
            if(err) return false;

            return rows;
        });
    }

    ListarUsuarioPorEmail(data) {
        let {email} = data;

        db.query('select * from usuario where `email` = ?', email, (err, rows) => {
            if(err) return false;

            return rows;
        });
    }

    CriarUsuario(data) {
        let {avatar, nome, cpf, dataNascimento, sexo, email, senha, funcao} = data; 
        //let hash = bcryptjs.hashSync(senha, 15);
        let sql = `
            CALL InsereUsuario(?, ?, ?, ?, ?, ?, ?, ?);
        `;
        
        db.query(sql, [
            avatar, nome, cpf, dataNascimento, sexo, email, senha, funcao
        ], (err, rows) => {
            if(err) return false;

            return rows;
        });
    }

    EditarUsuario(data) {
        let {id, nome, cpf, dataNascimento, sexo, email, funcao} = data;
        let sql = `
            CALL EditarUsuario(?, ?, ?, ?, ?, ?, ?);
        `;

        db.query(sql, [
            nome, cpf, dataNascimento, sexo, email, funcao, id
        ], (err, rows) => {
            if(err) return false;

            return rows;
        });
    }

    DeletarUsuario(data) {
        let {id} = data;
        let sql = `
            CALL DeletarUsuario(?);
        `;

        db.query(sql, id, (err, rows) => {
            if(err) return false;

            return rows;
        });
    }

}

module.exports = new UsuarioRepository();