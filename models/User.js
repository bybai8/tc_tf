let sequelize = require("sequelize");
let db = require("../config/db");

let user = db.define(
    "user", {
        username: { type: sequelize.STRING },
        email: { type: sequelize.STRING },
        notelp: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
    }, {
        freezeTableName: true
    }
);

module.exports = user;