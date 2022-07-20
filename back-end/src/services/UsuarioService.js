const UsuarioDao = require('../models/UsuarioDao');

const queries = {
    findAll: 'SELECT * FROM RelatorioUsuarios;',
    findById: 'SELECT * FROM usuario WHERE `id` = ?;',
    findByEmail: 'SELECT * FROM usuario WHERE `email` = ?',
    findByName: 'SELECT * FROM usuario WHERE usuario.nome LIKE ?',
    selectOne: 'SELECT * FROM siscad.aluno WHERE idAluno=?',
    insert: 'CALL InsereUsuario(?, ?, ?, ?, ?, ?, ?, ?);',
    update: 'CALL EditarUsuario(?, ?, ?, ?, ?, ?, ?, ?);',
    updateProfile: `UPDATE usuario
                    SET nome = ?, avatar = ?, cpf = ?, dt_nascimento = ?, sexo = ?, email = ?, updatedAt = current_timestamp
                    WHERE id = ?`,
    delete: 'CALL DeletarUsuario(?);',
    filterUsersByRole: 'SELECT * FROM usuario WHERE funcao = ?',
};

module.exports = class Usuario extends UsuarioDao {

    #id;
    #avatar;
    #nome;
    #cpf;
    #dt_nascimento;
    #email;
    #senha;
    #sexo;
    #telefone;
    #situacao;
    #funcao;

    //----------------------------------------------------------------------------
    //
    constructor(database, aluno) {

        super(database, queries);

        if (aluno) {
            this.#id = aluno.id;
            this.#avatar = aluno.avatar;
            this.#nome = aluno.nome;
            this.#cpf = aluno.cpf;
            this.#dt_nascimento = aluno.dt_nascimento;
            this.#email = aluno.email;
            this.#senha = aluno.senha;
            this.#sexo = aluno.sexo;
            this.#situacao = aluno.situacao;
            this.#funcao = aluno.funcao;
        }
    }

    //----------------------------------------------------------------------------
    //
    toJSON () {
        return {
            id: this.#id,
            nome: this.#nome,
            cpf: this.#cpf,
            dt_nascimento: this.#dt_nascimento,
            email: this.#email,
            senha: this.#senha,
            sexo: this.#sexo,
            situacao: this.#situacao
        }
    }

    //----------------------------------------------------------------------------
    //
    toString () {
        return JSON.stringify(this.toJSON, null, 4);
    }

    //----------------------------------------------------------------------------
    //
    insert () {
        return super.insert([
            this.#avatar,
            this.#nome,
            this.#cpf,
            this.#dt_nascimento,
            this.#sexo,
            this.#email,
            this.#senha,
            this.#funcao
        ]);
    }

    //----------------------------------------------------------------------------
    //
    filterUsersByRole(filter) {
        return super.filterUsersByRole(filter);
    }
}