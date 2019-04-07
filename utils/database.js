const Sequelize = require('sequelize');

const sequelize = new Sequelize('corso_nodejs','root','root',
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