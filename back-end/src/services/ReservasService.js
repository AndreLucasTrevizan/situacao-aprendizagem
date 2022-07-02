const ReservaDao = require('../models/ReservaDao');

const queries = {
    findAll: `
                SELECT 
                    sala.apelido as sala,
                    turma.apelido as turma,
                    usuario.avatar as avatar,
                    usuario.nome as usuario,
                    usuario.funcao as funcao,
                    reserva.id as id,
                    reserva.id_usuario as id_usuario,
                    reserva.justificativa as justificativa,
                    reserva.periodo as periodo,
                    reserva.createdAt as createdAt,
                    reserva.updatedAt as updatedAt
                FROM reserva
                INNER JOIN sala on sala.id = reserva.id_sala
                INNER JOIN turma on turma.id = reserva.id_turma
                INNER JOIN usuario on usuario.id = reserva.id_usuario
                WHERE reserva.dt_reserva = ?;
            `,
    findById: 'SELECT * FROM reserva WHERE `id` = ?;',
    check: 'SELECT * FROM reserva WHERE reserva.id_sala = ? AND reserva.periodo = ? AND reserva.dt_reserva = ?',
    insert: 'CALL InsereReserva(?, ?, ?, ?, ?, ?);',
    update: 'CALL EditarReserva(?, ?, ?, ?, ?, ?, ?);',
    delete: 'CALL DeletarReserva(?);'
};

module.exports = class ReservasService extends ReservaDao {

    #id;
    #justificativa;
    #dt_reserva;
    #periodo;
    #id_usuario;
    #id_sala;
    #id_turma;

    //----------------------------------------------------------------------------
    //
    constructor(database, reserva) {

        super(database, queries);

        if (reserva) {
            this.#id = reserva.id;
            this.#justificativa = reserva.justificativa;
            this.#dt_reserva = reserva.dt_reserva;
            this.#periodo = reserva.periodo;
            this.#id_usuario = reserva.id_usuario;
            this.#id_sala = reserva.id_sala;
            this.#id_turma = reserva.id_turma;
        }
    }

    //----------------------------------------------------------------------------
    //
    toJSON () {
        return {
            id: this.#id,
            justificativa: this.#justificativa,
            dt_reserva: this.#dt_reserva,
            periodo: this.#periodo,
            id_usuario: this.#id_usuario,
            id_sala: this.#id_sala,
            id_turma: this.#id_turma
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
            this.#justificativa,
            this.#dt_reserva,
            this.#periodo,
            this.#id_usuario,
            this.#id_sala,
            this.#id_turma
        ]);
    }
}