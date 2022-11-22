import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.NODE_DATABASE,
    process.env.NODE_DATABASE_USER,
    process.env.NODE_DATABASE_PW,
{
    dialect : 'mysql',
    host: process.env.NODE_DATABASE_URL,
    port : process.env.NODE_DATABASE_PORT || 3306
}
);


/*
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    database: 'corso_nodejs',
    user: 'root',
    password: 'root'
});
module.exports = pool.promise();
*/


export { sequelize };
