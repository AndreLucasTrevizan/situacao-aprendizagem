const SalaDao = require('../models/SalaDao');

const queries = {
    findAll: 'SELECT * FROM RelatorioSalas;',
    findById: 'SELECT * FROM sala WHERE `id` = ?;',
    insert: 'CALL InsereSala(?, ?, ?, ?, ?);',
    update: 'CALL EditarSala(?, ?, ?, ?, ?, ?);',
    delete: 'CALL DeletarSala(?);'
};

module.exports = class SalasService extends SalaDao {

    #id;
    #numero;
    #bloco;
    #apelido;
    #descricao_tipo;
    #capacidade;

    //----------------------------------------------------------------------------
    //
    constructor(database, sala) {

        super(database, queries);

        if (sala) {
            this.#id = sala.id;
            this.#numero = sala.numero;
            this.#bloco = sala.bloco;
            this.#apelido = sala.apelido;
            this.#descricao_tipo = sala.descricao_tipo;
            this.#capacidade = sala.capacidade;
        }
    }

    //----------------------------------------------------------------------------
    //
    toJSON () {
        return {
            id: this.#id,
            numero: this.#numero,
            bloco: this.#bloco,
            apelido: this.#apelido,
            descricao_tipo: this.#descricao_tipo,
            capacidade: this.#capacidade
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
            this.#numero,
            this.#bloco,
            this.#apelido,
            this.#descricao_tipo,
            this.#capacidade
        ]);
    }
}