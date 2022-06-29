const TurmasDao = require('../models/TurmasDao');

const queries = {
    findAll: 'SELECT * FROM RelatorioTurmas;',
    findById: 'SELECT * FROM turma WHERE `id` = ?;',
    findByApelido: 'SELECT * FROM turma WHERE `apelido` = ?',
    insert: 'CALL InsereTurma(?, ?, ?, ?);',
    update: 'CALL EditarTurma(?, ?, ?, ?, ?);',
    delete: 'CALL DeletarTurma(?);'
};

module.exports = class Usuario extends TurmasDao {

    #id;
    #apelido;
    #nome_curso;
    #ano_inicio;
    #duracao;

    //----------------------------------------------------------------------------
    //
    constructor(database, aluno) {

        super(database, queries);

        if (aluno) {
            this.#id = aluno.id;
            this.#apelido = aluno.apelido;
            this.#nome_curso = aluno.nome_curso;
            this.#ano_inicio = aluno.ano_inicio;
            this.#duracao = aluno.duracao;
        }
    }

    //----------------------------------------------------------------------------
    //
    toJSON () {
        return {
            id: this.#id,
            apelido: this.#apelido,
            nome_curso: this.#nome_curso,
            ano_inicio: this.#ano_inicio,
            duracao: this.#duracao
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
            this.#apelido,
            this.#nome_curso,
            this.#ano_inicio,
            this.#duracao,
        ]);
    }
}