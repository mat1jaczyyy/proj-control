const db = require('../database');

module.exports = class Status {
    constructor (nazivStatusa) {
        this.nazivStatusa = nazivStatusa;
    }

    async apply() {
        return await db.query(
            `INSERT INTO Status (nazivStatusa) VALUES (
             VALUES ($1) RETURNING *`,
            [this.nazivStatusa]
        );
    }

    static async getStatusName(idStatusa) {
        return (await db.query(
            `SELECT * FROM nazivStatusa WHERE idStatusa = $1`,
            [idStatusa]
        )).rows;
    }
}