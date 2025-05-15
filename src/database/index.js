const Sequelize = require('sequelize');
const databaseConfig = require('../config/db');
const Users = require('../apps/models/Users');
const Budgets = require('../apps/models/Budgets');
const Admins = require('../apps/models/Admins');

const models = [Users, Budgets, Admins];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models.forEach(model => {
            model.init(this.connection);
        });

        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

module.exports = new Database();