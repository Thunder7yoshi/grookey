const { Sequelize:s } = require('sequelize');
const { join } = require('path');

module.exports = class Sequelize extends s {
    constructor(...args) {
        super(...args, {
            dialect: 'sqlite',
            storage: join(__dirname, '..', 'database', 'database.sqlite')
        });
    };
    async auth() {
        try {
            await this.authenticate();
        } catch (e) {
            console.error(e);
        };
    };
};