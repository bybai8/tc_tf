const sequelize = require("sequelize");

const db = new sequelize("tc_tf", "root", "", {
    dialect: "mysql",
    port: 3307,
});

db.sync({});

module.exports = db;