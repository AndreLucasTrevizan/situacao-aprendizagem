module.exports = class Dao {

    #db;
    #queries

    //----------------------------------------
    // Construtor da classe.
    constructor(db, queries) {
        this.#db = db;
        this.#queries = queries;
    }

    //----------------------------------------
    // Verificar Retorno
    findAll (dt_reserva) {

        return new Promise(async (resolve, reject) => {

            try {

                const [rows] = await this.#db.query(this.#queries.findAll, dt_reserva);
                resolve(rows);

            } catch (err) {
                reject(err);
            }
        });

    }

    //----------------------------------------
    // Verificar Retorno
    check(values) {
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await this.#db.query(this.#queries.check, values);
                resolve(rows[0]);
            } catch (err) {
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Verificar Retorno
    findById(id) {

        return new Promise(async (resolve, reject) => {

            try {

                const [rows] = await this.#db.query(this.#queries.findById, id);
                
                resolve(rows[0]);

            } catch (err) {
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Verificar Effected Rows
    insert (values) {

        return new Promise(async (resolve, reject) => {

            try {
                const result = await this.#db.execute(this.#queries.insert, values);
                resolve(result);

            } catch (err) {
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Verificar Effected Rows
    update (values) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.#db.execute(this.#queries.update, values);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }


    //----------------------------------------
    // Verificar Effected Rows
    delete (id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.#db.query(this.#queries.delete, [id]);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

}