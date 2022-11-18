import { Sequelize } from "sequelize";
import { sequelize } from "../utils/database/sequelize.js";

const UserModel = sequelize.define('user',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true
    },
    name : {
        type: Sequelize.STRING,
        allowNull : false,
    },      
    email : {
        type: Sequelize.STRING,
        allowNull : false,
    },            
    password : {
        type: Sequelize.STRING,
        allowNull : false,
    },      
});

export { UserModel }