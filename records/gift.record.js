const {pool} = require("../utils/db");
const {ValidationError} = require("../utils/error");
const {v4: uuid} = require('uuid');

class GiftRecord {
    constructor(obj) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 55) {
            throw new ValidationError('nazwa prezentu musi mieć od 3 do 55 znaków.')
        }

        if (!obj.count || obj.count < 1 || obj.count > 999999) {
            throw new ValidationError('liczba szt. prezentu powinna się mieścić w przedziale 1 - 999999..')
        }

        this.id = obj.id;
        this.name = obj.name;
        this.count = obj.count;
    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `gifts` VALUES(:id, :name, :count)", {
            id: this.id,
            name: this.name,
            count: this.count,
        });

        return this.id;
    }

    static async listAll() {
        const [results] = await pool.execute("SELECT * FROM `gifts`");
        return results;
    }

    static async getOne(id) {
        const [results] = await pool.execute("SELECT * FROM `gifts` WHERE `id` = :id", {
            id,
        });
        return results.length === 0 ? null : new GiftRecord(results[0]);
    }
}


module.exports = {
    GiftRecord,
}
