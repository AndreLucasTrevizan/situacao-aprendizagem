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
    findAll () {

        return new Promise(async (resolve, reject) => {

            try {

                const [rows] = await this.#db.query(this.#queries.findAll);
                resolve(rows);

            } catch (err) {
                reject(err);
            }
        });

    }

    //----------------------------------------
    // Retorna um registro por email
    findByEmail(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await this.#db.query(this.#queries.findByEmail, email);
                resolve(rows[0]);
            } catch (error) {
                reject(error);
            }
        });
    }

    //----------------------------------------
    // Retorna um registro por nome
    findByName(name) {
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await this.#db.query(this.#queries.findByName, `%${name}%`);
                console.log(rows);
                resolve(rows);
            } catch (error) {
                reject(error);
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
                console.log(values);
                const result = await this.#db.execute(this.#queries.insert, values);
                resolve(result);

            } catch (err) {

                const strErr = String(err);

                if (strErr.includes('Duplicate entry')) {
                    return reject('Entidade já cadastrada: ' + strErr);
                }

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
    updateProfile (values) {
        return new Promise(async (resolve, reject) => {
            try {
                const [result] = await this.#db.execute(this.#queries.updateProfile, values);
                resolve(result[0]);
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
                const result = await this.#db.query(this.#queries.delete, id);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

}