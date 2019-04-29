const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.NODE_DATABASE,
    process.env.NODE_DATABASE_USER,
    process.env.NODE_DATABASE_PW,
{
    dialect : 'mysql',
    host: 'localhost'
}
);

module.exports = sequelize;




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